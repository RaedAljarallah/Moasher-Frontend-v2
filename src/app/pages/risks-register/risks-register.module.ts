import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RisksRegisterListComponent} from './risks-register-list/risks-register-list.component';
import {InitiativesModule} from "../initiatives/initiatives.module";


@NgModule({
    declarations: [
        RisksRegisterListComponent
    ],
    imports: [
        CommonModule,
        InitiativesModule,
    ],
    exports: [
        RisksRegisterListComponent
    ]
})
export class RisksRegisterModule {
}
