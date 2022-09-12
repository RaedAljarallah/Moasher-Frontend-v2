import {Component, Input, OnInit} from '@angular/core';
import {IInitiativeFinancialSummaryChart} from "../../../shared/charts/models/initiative-financial-summary-chart.model";
import {Observable, timer} from "rxjs";
import {ApiService} from "../../../core/services/api.service";
import {map, tap} from "rxjs/operators";
import {IPerformanceCardValue} from "../../../shared/charts/models/performance-card-value.model";
import {ChartUtility} from "../../../shared/charts/utilities/chart.utility";
import {IProgressChart} from "../../../shared/charts/models/progress-chart.model";

@Component({
    selector: 'app-initiative-performance',
    templateUrl: './initiative-performance.component.html'
})
export class InitiativePerformanceComponent implements OnInit {
    @Input() initiativeId: string = '';

    public isInitiativeSummaryLoading: boolean = true;
    public currentYearSpending?: IPerformanceCardValue;
    public currentPeriodContractingPerformance?: IPerformanceCardValue;
    public currentPeriodSpendingPerformance?: IPerformanceCardValue;
    public allTimeSpendingPerformance?: IPerformanceCardValue;
    public fundingPerformance?: IPerformanceCardValue;
    public contractingPerformance?: IPerformanceCardValue;
    public initiativeProgress?: IProgressChart;
    public milestoneProgressPerformance?: IPerformanceCardValue;
    public spendingPlan$: Observable<any> = new Observable<any>();
    public spendingYear: number = new Date().getFullYear();

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.getInitiativeSummary();
        this.spendingPlan$ = this.getSpendingPlan();
    }


    private getInitiativeSummary(): void {
        this.api.get<IInitiativeFinancialSummaryChart>(`initiatives/summary?id=${this.initiativeId}`)
            .pipe(
                map((res) => res.result),
                tap(() => this.isInitiativeSummaryLoading = false)
            )
            .subscribe(result => {

                this.fundingPerformance = {
                    target: {
                        name: 'إجمالي التكاليف',
                        value: result.requiredCost
                    },
                    actual: {
                        name: 'التكاليف المعتمدة',
                        value: result.approvedCost
                    }
                }

                this.contractingPerformance = {
                    target: {
                        name: 'التكاليف المعتمدة',
                        value: result.approvedCost
                    },
                    actual: {
                        name: 'إجمالي الإرتباطات',
                        value: result.contractsAmount
                    }
                }

                this.allTimeSpendingPerformance = {
                    target: {
                        name: 'إجمالي الإرتباطات',
                        value: result.contractsAmount
                    },
                    actual: {
                        name: 'إجمالي المنصرف',
                        value: result.totalExpenditure
                    }
                }

                this.currentPeriodSpendingPerformance = {
                    target: {
                        name: 'المستهدف',
                        value: 10000
                    },
                    actual: {
                        name: `مخطط الصرف ${ChartUtility.getCurrentQuarter()}`,
                        value: 5000
                    },
                }

                this.currentPeriodContractingPerformance = {
                    target: {
                        name: 'المستهدف',
                        value: 10000
                    },
                    actual: {
                        name: `مخطط التعاقد ${ChartUtility.getCurrentQuarter()}`,
                        value: 5000
                    }
                }

                this.currentYearSpending = {
                    target: {
                        name: `سيولة ${this.spendingYear}`,
                        value: 96000000
                    },
                    actual: {
                        name: `منصرف ${this.spendingYear}`,
                        value: 12000
                    }
                }

                this.milestoneProgressPerformance = {
                    target: {
                        name: 'المعالم المستحقة',
                        value: 20
                    },
                    actual: {
                        name: 'المعالم المنجزة',
                        value: 17
                    }
                }

                this.initiativeProgress = {
                    planned: result.plannedProgress,
                    actual: result.actualProgress,
                    status: result.statuses[0]
                }

            })
    }
    private getSpendingPlan(): Observable<any> {
        return timer(1000).pipe(
            map(() => [])
        )
    }
}
