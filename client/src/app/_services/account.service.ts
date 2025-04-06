import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/accounts/register`, user);
    }

    verifyEmail(token: string) {
        return this.http.post(`${environment.apiUrl}/accounts/verify-email`, { token });
    }

    login(email: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/accounts/authenticate`, { email, password })
            .pipe(map(user => {
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }
}