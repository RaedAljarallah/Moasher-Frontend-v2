import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersListComponent} from './users-list/users-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        UsersListComponent,
        UserFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        UsersListComponent,
        UserFormComponent
    ]
})
export class UsersModule {
}
