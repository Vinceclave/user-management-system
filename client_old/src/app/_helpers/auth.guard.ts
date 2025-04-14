import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.accountService.accountValue;
        if (account) {
            // Check if route is restricted by role
            if (route.data.roles && !route.data.roles.includes(account.role)) {
                // Role not authorized, redirect to the home page
                this.router.navigate(['/']);
                return false;
            }

            // Authorized, return true
            return true;
        }

        // Not logged in, redirect to login page with the return URL
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}