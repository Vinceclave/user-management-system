import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { LayoutComponent } from './_components/layout/layout.component';
import { AccountModule } from './account/account.module';
import { DepartmentModule } from './_components/departments/department.module';
import { EmployeeModule } from './_components/employees/employee.module';
import { WorkflowModule } from './_components/workflows/workflow.module';
import { RequestModule } from './_components/requests/request.module';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        CommonModule,
        AccountModule,
        DepartmentModule,
        EmployeeModule,
        WorkflowModule,
        RequestModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LayoutComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }