import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';

@Component({
    templateUrl: 'verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {
    verifying = true;

    constructor(
        private route: ActivatedRoute,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        const token = this.route.snapshot.queryParams['token'];
        
        this.accountService.verifyEmail(token)
            .subscribe({
                next: () => {
                    this.verifying = false;
                    this.alertService.success('Verification successful, you can now login');
                },
                error: error => {
                    this.verifying = false;
                    this.alertService.error(error);
                }
            });
    }
}