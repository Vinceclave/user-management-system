import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
  return () => new Promise(resolve => {
    console.log('Application initializing, attempting token refresh');
    
    // Attempt to refresh token on app start up to auto authenticate
    // Since the refresh token is stored in an HTTP-only cookie
    accountService.refreshToken()
      .subscribe({
        next: (account) => {
          console.log('Token refresh successful - user authenticated:', account?.email);
          resolve(true);
        },
        error: (error) => {
          // If refresh fails, just continue without a token
          console.log('Token refresh failed - this is normal for new users or expired sessions');
          
          // Don't show error message for standard auth flow
          if (error !== 'No refresh token found' && error !== 'Invalid token') {
            console.error('Unexpected error during token refresh:', error);
          }
          
          resolve(true);
        }
      });
  });
}