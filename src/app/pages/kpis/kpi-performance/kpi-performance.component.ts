import {Component, Input, OnInit} from '@angular/core';
import {ChartService} from "../../../shared/charts/services/chart.service";
import {Observable} from "rxjs";
import {IProgressChart} from "../../../shared/charts/models/progress-chart.model";
import {IPerformanceCardValue} from "../../../shared/charts/models/performance-card-value.model";
import {IProgressOvertimeChart} from "../../../shared/charts/models/progress-overtime-chart.model";

@Component({
    selector: 'app-kpi-performance',
    templateUrl: './kpi-performance.component.html',
    styles: []
})
export class KpiPerformanceComponent implements OnInit {
    @Input() kpiId: string = '';
    
    public kpiProgress$: Observable<IProgressChart> = new Observable<IProgressChart>();
    public kpiValuesProgressPerformance$: Observable<IPerformanceCardValue> = new Observable<IPerformanceCardValue>();
    public progressOvertime$: Observable<IProgressOvertimeChart[]> = new Observable<IProgressOvertimeChart[]>();
    
    constructor(private chart: ChartService) {
    }

    ngOnInit(): void {
        this.kpiProgress$ = this.chart.getKpiProgress(this.kpiId);
        this.kpiValuesProgressPerformance$ = this.chart.getKpiValuesProgress({key: 'kpiId', value: this.kpiId});
        this.progressOvertime$ = this.chart.getKpiProgressOvertime(this.kpiId);
    }

}
