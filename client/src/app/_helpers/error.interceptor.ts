import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log('Error interceptor caught error:', {
                status: err.status,
                url: request.url,
                error: err.error,
                isRefreshRequest: request.url.includes('refresh-token')
            });

            if ([401, 403].includes(err.status)) {
                // Only handle 401s for non-refresh-token requests
                if (!request.url.includes('refresh-token') && this.accountService.accountValue) {
                    // auto logout if 401 or 403 response returned from api
                    this.accountService.logout();
                }
            }

            const error = err.error?.message || err.statusText || err.message || 'An error occurred';
            console.error('Error details:', error);
            return throwError(() => error);
        }))
    }
}