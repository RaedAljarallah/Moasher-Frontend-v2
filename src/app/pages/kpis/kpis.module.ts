import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KpisListComponent} from './kpis-list/kpis-list.component';
import {KpiDetailComponent} from './kpi-detail/kpi-detail.component';
import {SharedModule} from "../../shared/shared.module";
import { KpiFormComponent } from './kpi-form/kpi-form.component';
import { KpiValuesComponent } from './kpi-values/kpi-values.component';
import { KpiValueFormComponent } from './kpi-values/kpi-value-form/kpi-value-form.component';
import { KpiPerformanceComponent } from './kpi-performance/kpi-performance.component';
import {AnalyticsModule} from "../analytics/analytics.module";
import { KpiOverViewComponent } from './kpi-over-view/kpi-over-view.component';


@NgModule({
    declarations: [
        KpisListComponent,
        KpiDetailComponent,
        KpiFormComponent,
        KpiValuesComponent,
        KpiValueFormComponent,
        KpiPerformanceComponent,
        KpiOverViewComponent
    ],
    imports: [
        CommonModule,
        AnalyticsModule,
        SharedModule
    ],
    exports: [
        KpisListComponent,
        KpiDetailComponent,
        KpiFormComponent,
        KpiValuesComponent,
        KpiValueFormComponent,
        KpiPerformanceComponent,
        KpiOverViewComponent
    ]
})
export class KPIsModule {
}
