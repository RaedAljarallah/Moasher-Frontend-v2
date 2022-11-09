import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ActivationComponent} from './activation/activation.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
    declarations: [
        ChangePasswordComponent,
        ActivationComponent,
        LoginComponent,
        LogoutComponent,
        ResetPasswordComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ChangePasswordComponent,
        ActivationComponent,
        LoginComponent,
        LogoutComponent,
        ResetPasswordComponent
    ]
})
export class AccountsModule {
}
