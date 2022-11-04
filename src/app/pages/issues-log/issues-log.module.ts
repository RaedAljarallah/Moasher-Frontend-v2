import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IssuesLogListComponent} from './issues-log-list/issues-log-list.component';
import {InitiativesModule} from "../initiatives/initiatives.module";


@NgModule({
    declarations: [
        IssuesLogListComponent
    ],
    imports: [
        CommonModule,
        InitiativesModule
    ],
    exports: [
        IssuesLogListComponent
    ]
})
export class IssuesLogModule {
}
