import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DataExportingComponent} from './data-exporting/data-exporting.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        DataExportingComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    exports: [
        DataExportingComponent
    ]
})
export class DataModule {
}
