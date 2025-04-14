import { Component, OnInit } from '@angular/core';

import { AccountService } from '../_services';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent implements OnInit {
    account: any; // Or the appropriate type from your models

    constructor(private accountService: AccountService) { }
    
    ngOnInit() {
        // Move the initialization to ngOnInit where accountService is available
        this.account = this.accountService.accountValue;
    }
}