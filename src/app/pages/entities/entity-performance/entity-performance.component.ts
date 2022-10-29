import {Component, Input, OnInit} from '@angular/core';
import {IPerformanceCardValue} from "../../../shared/charts/models/performance-card-value.model";
import {Observable} from "rxjs";
import {IFinancialPlanningChart} from "../../../shared/charts/models/financial-planning-chart.model";
import {ChartService} from "../../../shared/charts/services/chart.service";
import {IInitiativeSummaryChart} from "../../../shared/charts/models/initiative-summary-chart.model";
import {IStatusProgressChart} from "../../../shared/charts/models/status-progress-chart.model";
import {IStatusSummaryChart} from "../../../shared/charts/models/status-summary-chart.model";

@Component({
    selector: 'app-entity-performance',
    templateUrl: './entity-performance.component.html',
    styles: []
})
export class EntityPerformanceComponent implements OnInit {
    @Input() entityId: string = '';
    public initiativeSummaryChart?: IInitiativeSummaryChart;
    public milestoneProgressPerformance$: Observable<IPerformanceCardValue> = new Observable<IPerformanceCardValue>();
    public spendingPlan$: Observable<IFinancialPlanningChart[]> = new Observable<IFinancialPlanningChart[]>();
    public contractingPlan$: Observable<IFinancialPlanningChart[]> = new Observable<IFinancialPlanningChart[]>();
    public initiativesProgressOvertime$: Observable<IStatusProgressChart[]> = new Observable<IStatusProgressChart[]>();
    public kpisStatus$: Observable<IStatusSummaryChart> = new Observable<IStatusSummaryChart>();
    public kpisProgressPerformance$: Observable<IPerformanceCardValue> = new Observable<IPerformanceCardValue>();
    public kpisProgressOvertime$: Observable<IStatusProgressChart[]> = new Observable<IStatusProgressChart[]>();
    constructor(private chart: ChartService) {
    }

    public ngOnInit(): void {
        const params = {key: 'entityId', value: this.entityId};
        this.chart.getInitiativeSummary(params).subscribe(result => this.initiativeSummaryChart = result);
        this.spendingPlan$ = this.chart.getSpendingPlan(params);
        this.contractingPlan$ = this.chart.getContractingPlan(params);
        this.initiativesProgressOvertime$ = this.chart.getInitiativesStatusProgress(params);
        this.milestoneProgressPerformance$ = this.chart.getMilestonesProgress(params);
        this.kpisStatus$ = this.chart.getKpisStatuses(params);
        this.kpisProgressPerformance$ = this.chart.getKpiValuesProgress(params);
        this.kpisProgressOvertime$ = this.chart.getKpisStatusProgress(params);
    }
}
