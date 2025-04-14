import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    account: any; // Or use the actual Account type

    constructor(private accountService: AccountService) { }
    
    ngOnInit() {
        // Initialize the account property after the constructor has run
        this.account = this.accountService.accountValue;
    }
}