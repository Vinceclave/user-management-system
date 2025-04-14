TS account.module.ts
src > app > account > TS account.module.ts > ...

1  import { NgModule } from '@angular/core';
2  import { ReactiveFormsModule } from '@angular/forms';
3  import { CommonModule } from '@angular/common';

5  import { AccountRoutingModule } from './account-routing.module';
6  import { LayoutComponent } from './layout.component';
7  import { LoginComponent } from './login.component';
8  import { RegisterComponent } from './register.component';
9  import { VerifyEmailComponent } from './verify-email.component';
10 import { ForgotPasswordComponent } from './forgot-password.component';
11 import { ResetPasswordComponent } from './reset-password.component';

13 @NgModule({
14   imports: [
15     CommonModule,
16     ReactiveFormsModule,
17     AccountRoutingModule
18   ],
19   declarations: [
20     LayoutComponent,
21     LoginComponent,
22     RegisterComponent,
23     VerifyEmailComponent,
24     ForgotPasswordComponent,
25     ResetPasswordComponent
26   ]
27 })
28 export class AccountModule { }
