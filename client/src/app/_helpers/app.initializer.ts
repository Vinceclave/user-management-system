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
          console.log('Token refresh failed:', error);
          
          // Don't show error message for standard auth flow
          if (error === 'No refresh token found') {
            console.log('No refresh token found - new user or cleared cookies');
          } else if (error === 'Invalid token') {
            console.log('Invalid token - likely expired or not present in database');
          } else if (error === 'Token expired') {
            console.log('Refresh token has expired');
          } else if (error === 'Token revoked') {
            console.log('Refresh token was revoked');
          } else {
            console.error('Unexpected error during token refresh:', error);
          }
          
          // Always resolve to continue the application startup
          resolve(true);
        }
      });
  });
}