import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
  return () => new Promise(resolve => {
    // attempt to refresh token on app start up to auto authenticate
    // Note: We try to refresh token regardless of accountValue state
    // since the refresh token is stored in an HTTP-only cookie
    accountService.refreshToken()
      .subscribe({
        next: () => {
          console.log('Token refresh successful');
          resolve(true);
        },
        error: (error) => {
          // If refresh fails, just continue without a token
          console.log('Token refresh failed:', error);
          console.log('Proceeding with unauthenticated state');
          resolve(true);
        }
      });
  });
}