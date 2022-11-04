import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ActivationComponent} from './activation/activation.component';


@NgModule({
    declarations: [
        ChangePasswordComponent,
        ActivationComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ChangePasswordComponent,
        ActivationComponent
    ]
})
export class AccountsModule {
}
