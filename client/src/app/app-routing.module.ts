import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { LayoutComponent } from './_components/layout/layout.component';
import { DepartmentListComponent } from './_components/departments/department-list/department-list.component';
import { DepartmentFormComponent } from './_components/departments/department-form/department-form.component';
import { EmployeeListComponent } from './_components/employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './_components/employees/employee-form/employee-form.component';
import { WorkflowListComponent } from './_components/workflows/workflow-list/workflow-list.component';
import { WorkflowFormComponent } from './_components/workflows/workflow-form/workflow-form.component';
import { RequestListComponent } from './_components/requests/request-list/request-list.component';
import { RequestFormComponent } from './_components/requests/request-form/request-form.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
    { 
        path: '', 
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'departments', component: DepartmentListComponent },
            { path: 'departments/create', component: DepartmentFormComponent },
            { path: 'departments/edit/:id', component: DepartmentFormComponent },
            { path: 'employees', component: EmployeeListComponent },
            { path: 'employees/create', component: EmployeeFormComponent },
            { path: 'employees/edit/:id', component: EmployeeFormComponent },
            { path: 'workflows', component: WorkflowListComponent },
            { path: 'workflows/create', component: WorkflowFormComponent },
            { path: 'workflows/edit/:id', component: WorkflowFormComponent },
            { path: 'requests', component: RequestListComponent },
            { path: 'requests/create', component: RequestFormComponent },
            { path: 'requests/view/:id', component: RequestFormComponent }
        ]
    },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
