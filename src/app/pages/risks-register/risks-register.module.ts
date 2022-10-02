import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RisksRegisterRoutingModule} from './risks-register-routing.module';
import {RisksRegisterListComponent} from './risks-register-list/risks-register-list.component';
import {InitiativesModule} from "../initiatives/initiatives.module";


@NgModule({
    declarations: [
        RisksRegisterListComponent
    ],
    imports: [
        CommonModule,
        InitiativesModule,
        RisksRegisterRoutingModule
    ],
    exports: [
        RisksRegisterListComponent
    ]
})
export class RisksRegisterModule {
}
