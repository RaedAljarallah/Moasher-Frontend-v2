import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnalyticsListComponent} from './analytics-list/analytics-list.component';
import {AnalyticFormComponent} from './analytic-form/analytic-form.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        AnalyticsListComponent,
        AnalyticFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        AnalyticsListComponent,
        AnalyticFormComponent
    ]
})
export class AnalyticsModule {
}
