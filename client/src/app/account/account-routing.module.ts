TS account-routing.module.ts x
src > app > account > TS account-routing.module.ts > ...

1  import { NgModule } from '@angular/core';
2  import { Routes, RouterModule } from '@angular/router';

4  import { LayoutComponent } from './layout.component';
5  import { LoginComponent } from './login.component';
6  import { RegisterComponent } from './register.component';
7  import { VerifyEmailComponent } from './verify-email.component';
8  import { ForgotPasswordComponent } from './forgot-password.component';
9  import { ResetPasswordComponent } from './reset-password.component';

11 const routes: Routes = [
12   {
13     path: '', component: LayoutComponent,
14     children: [
15       { path: 'login', component: LoginComponent },
16       { path: 'register', component: RegisterComponent },
17       { path: 'verify-email', component: VerifyEmailComponent },
18       { path: 'forgot-password', component: ForgotPasswordComponent },
19       { path: 'reset-password', component: ResetPasswordComponent }
20     ]
21   }
22 ];

24 @NgModule({
25   imports: [RouterModule.forChild(routes)],
26   exports: [RouterModule]
27 })
28 export class AccountRoutingModule { }
