import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
  return () => new Promise(resolve => {
    // attempt to refresh token on app start up to auto authenticate
    if (accountService.accountValue?.refreshToken) {
      accountService.refreshToken()
        .subscribe({
          next: () => {
            resolve(true);
          },
          error: () => {
            // If refresh fails, just continue without a token
            console.log('Token refresh failed, proceeding with unauthenticated state');
            resolve(true);
          }
        });
    } else {
      // No refresh token available, resolve immediately
      resolve(true);
    }
  });
}