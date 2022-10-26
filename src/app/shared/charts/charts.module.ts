import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { FinancialChartComponent } from './financial-chart/financial-chart.component';
import { PerformanceCardComponent } from './performance-card/performance-card.component';
import {PipesModule} from "../pipes/pipes.module";
import { ProgressChartComponent } from './progress-chart/progress-chart.component';
import { ProgressOverTimeChartComponent } from './progress-over-time-chart/progress-over-time-chart.component';
import { ExpenditureProgressChartComponent } from './expenditure-progress-chart/expenditure-progress-chart.component';
import { ContractingProgressChartComponent } from './contracting-progress-chart/contracting-progress-chart.component';
import { StatusSummaryChartComponent } from './status-summary-chart/status-summary-chart.component';
import { StatusProgressChartComponent } from './status-progress-chart/status-progress-chart.component';


@NgModule({
    declarations: [
        FinancialChartComponent,
        PerformanceCardComponent,
        ProgressChartComponent,
        ProgressOverTimeChartComponent,
        ExpenditureProgressChartComponent,
        ContractingProgressChartComponent,
        StatusSummaryChartComponent,
        StatusProgressChartComponent,
    ],
    imports: [
        CommonModule,
        NgxChartsModule,
        PipesModule
    ],
    exports: [
        FinancialChartComponent,
        PerformanceCardComponent,
        ProgressChartComponent,
        ProgressOverTimeChartComponent,
        ExpenditureProgressChartComponent,
        ContractingProgressChartComponent,
        StatusSummaryChartComponent,
        StatusProgressChartComponent,
    ]
})
export class ChartsModule {
}
