import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KPIsRoutingModule} from './kpis-routing.module';
import {KpisListComponent} from './kpis-list/kpis-list.component';
import {KpiDetailComponent} from './kpi-detail/kpi-detail.component';
import {SharedModule} from "../../shared/shared.module";
import { KpiFormComponent } from './kpi-form/kpi-form.component';


@NgModule({
    declarations: [
        KpisListComponent,
        KpiDetailComponent,
        KpiFormComponent
    ],
    imports: [
        CommonModule,
        KPIsRoutingModule,
        SharedModule
    ],
    exports: [
        KpisListComponent,
        KpiDetailComponent,
        KpiFormComponent
    ]
})
export class KPIsModule {
}
