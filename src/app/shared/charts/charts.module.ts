import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { FinancialChartComponent } from './financial-chart/financial-chart.component';
import { FinancialPlanningEfficiencyChartComponent } from './financial-planning-efficiency-chart/financial-planning-efficiency-chart.component';
import { TextComboComponent } from './text-combo/text-combo.component';
import { PerformanceCardComponent } from './performance-card/performance-card.component';
import {PipesModule} from "../pipes/pipes.module";
import { ProgressChartComponent } from './progress-chart/progress-chart.component';
import { ProgressOverTimeChartComponent } from './progress-over-time-chart/progress-over-time-chart.component';


@NgModule({
    declarations: [
        FinancialChartComponent,
        FinancialPlanningEfficiencyChartComponent,
        TextComboComponent,
        PerformanceCardComponent,
        ProgressChartComponent,
        ProgressOverTimeChartComponent,
    ],
    imports: [
        CommonModule,
        NgxChartsModule,
        PipesModule
    ],
    exports: [
        FinancialChartComponent,
        FinancialPlanningEfficiencyChartComponent,
        TextComboComponent,
        PerformanceCardComponent,
        ProgressChartComponent,
        ProgressOverTimeChartComponent,
    ]
})
export class ChartsModule {
}
