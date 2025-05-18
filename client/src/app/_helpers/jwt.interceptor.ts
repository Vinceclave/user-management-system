import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AccountService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const account = this.accountService.accountValue;
        const isLoggedIn = account && account.jwtToken;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        
        console.log('JWT Interceptor:', {
            account,
            isLoggedIn,
            isApiUrl,
            url: request.url,
            headers: request.headers.keys()
        });
        
        // For API requests, always include credentials
        if (isApiUrl) {
            let clonedRequest = request.clone({
                withCredentials: true
            });

            // Add authorization header if logged in
            if (isLoggedIn) {
                clonedRequest = clonedRequest.clone({
                    setHeaders: { 
                        'Authorization': `Bearer ${account.jwtToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Added Authorization header:', clonedRequest.headers.get('Authorization'));
            }
            
            console.log('Set withCredentials to true for API request');
            request = clonedRequest;
        }

        return next.handle(request);
    }
}