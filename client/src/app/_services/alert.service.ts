import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();

    onAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string) {
        this.subject.next({ type: 'success', message });
    }

    error(message: string) {
        this.subject.next({ type: 'error', message });
    }

    clear() {
        this.subject.next(null);
    }
}