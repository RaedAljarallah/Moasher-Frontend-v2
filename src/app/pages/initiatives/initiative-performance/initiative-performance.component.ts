import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IPerformanceCardValue} from "../../../shared/charts/models/performance-card-value.model";
import {IFinancialPlanningChart} from "../../../shared/charts/models/financial-planning-chart.model";
import {IProgressOvertimeChart} from "../../../shared/charts/models/progress-overtime-chart.model";
import {IInitiativeSummaryChart} from "../../../shared/charts/models/initiative-summary-chart.model";
import {ChartService} from "../../../shared/charts/services/chart.service";

@Component({
    selector: 'app-initiative-performance',
    templateUrl: './initiative-performance.component.html'
})
export class InitiativePerformanceComponent implements OnInit {
    @Input() initiativeId: string = '';

    public initiativeSummaryChart?: IInitiativeSummaryChart;
    public milestoneProgressPerformance$: Observable<IPerformanceCardValue> = new Observable<IPerformanceCardValue>();
    public spendingPlan$: Observable<IFinancialPlanningChart[]> = new Observable<IFinancialPlanningChart[]>();
    public contractingPlan$: Observable<IFinancialPlanningChart[]> = new Observable<IFinancialPlanningChart[]>();
    public progressOvertime$: Observable<IProgressOvertimeChart[]> = new Observable<IProgressOvertimeChart[]>();

    constructor(private chart: ChartService) {
    }

    ngOnInit(): void {
        const params = {key: 'initiativeId', value: this.initiativeId};
        this.chart.getInitiativeSummary({key: 'id', value: this.initiativeId}).subscribe(result => this.initiativeSummaryChart = result);
        this.spendingPlan$ = this.chart.getSpendingPlan(params);
        this.contractingPlan$ = this.chart.getContractingPlan(params);
        this.progressOvertime$ = this.chart.getProgressOvertime(params);
        this.milestoneProgressPerformance$ = this.chart.getMilestonesProgress(params);
    }
    
}
