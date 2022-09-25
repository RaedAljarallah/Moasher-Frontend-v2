import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KPIsRoutingModule} from './kpis-routing.module';
import {KpisListComponent} from './kpis-list/kpis-list.component';
import {KpiDetailComponent} from './kpi-detail/kpi-detail.component';
import {SharedModule} from "../../shared/shared.module";
import { KpiFormComponent } from './kpi-form/kpi-form.component';
import { KpiValuesComponent } from './kpi-values/kpi-values.component';
import { KpiValueFormComponent } from './kpi-values/kpi-value-form/kpi-value-form.component';
import { KpiPerformanceComponent } from './kpi-performance/kpi-performance.component';


@NgModule({
    declarations: [
        KpisListComponent,
        KpiDetailComponent,
        KpiFormComponent,
        KpiValuesComponent,
        KpiValueFormComponent,
        KpiPerformanceComponent
    ],
    imports: [
        CommonModule,
        KPIsRoutingModule,
        SharedModule
    ],
    exports: [
        KpisListComponent,
        KpiDetailComponent,
        KpiFormComponent,
        KpiValuesComponent,
        KpiValueFormComponent,
        KpiPerformanceComponent
    ]
})
export class KPIsModule {
}
