import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) return;

        this.loading = true;
        this.accountService.login(this.form.value.email, this.form.value.password)
            .subscribe({
                next: () => this.router.navigate(['/']),
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}