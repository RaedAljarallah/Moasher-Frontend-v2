import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ActivationComponent} from './activation/activation.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
    declarations: [
        ChangePasswordComponent,
        ActivationComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ChangePasswordComponent,
        ActivationComponent,
        LoginComponent,
        LogoutComponent
    ]
})
export class AccountsModule {
}
