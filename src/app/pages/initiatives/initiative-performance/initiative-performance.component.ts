import {Component, Input, OnInit} from '@angular/core';
import {IInitiativeFinancialSummaryChart} from "../../../shared/charts/models/initiative-financial-summary-chart.model";
import {Observable, timer} from "rxjs";
import {ApiService} from "../../../core/services/api.service";
import {map, tap} from "rxjs/operators";
import {IPerformanceCardValue} from "../../../shared/charts/models/performance-card-value.model";
import {ChartUtility} from "../../../shared/charts/utilities/chart.utility";
import {IProgressChart} from "../../../shared/charts/models/progress-chart.model";
import {IInitiativeSummary} from "../core/models/IInitiativeSummary.model";
import {DateUtility} from "../../../core/utilities/date.utility";

@Component({
    selector: 'app-initiative-performance',
    templateUrl: './initiative-performance.component.html'
})
export class InitiativePerformanceComponent implements OnInit {
    @Input() initiativeId: string = '';

    public isInitiativeSummaryLoading: boolean = true;
    public estimateAtCompletion?: IPerformanceCardValue;
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
        this.api.get<IInitiativeSummary>(`initiatives/summary?id=${this.initiativeId}`)
            .pipe(
                map((res) => res.result),
                tap(() => this.isInitiativeSummaryLoading = false)
            )
            .subscribe(result => {

                this.fundingPerformance = {
                    target: {
                        name: 'التكاليف المطلوبة',
                        value: result.requiredCost,
                        tooltip: 'التكاليف المطلوبة في خطة تنفيذ البرنامج'
                    },
                    actual: {
                        name: 'التكاليف المعتمدة',
                        value: result.approvedCost,
                        tooltip: 'التكاليف المعتمدة من اللجنة الإستراتيجية'
                    }
                }
                
                this.estimateAtCompletion = {
                    target: {
                        name: 'التكاليف المطلوبة',
                        value: result.requiredCost,
                        tooltip: 'التكاليف المطلوبة في خطة تنفيذ البرنامج'
                    },
                    actual: {
                        name: 'التكاليف المتوقعة للإكمال',
                        value: result.estimatedBudgetAtCompletion,
                        tooltip: 'التكاليف المتوقعة لإكمال المبادرة'
                    }
                }
                
                this.contractingPerformance = {
                    target: {
                        name: 'التكاليف المعتمدة',
                        value: result.approvedCost,
                        tooltip: 'التكاليف المعتمدة من اللجنة الإستراتيجية'
                    },
                    actual: {
                        name: 'إجمالي الإرتباطات',
                        value: result.contractsAmount,
                        tooltip: 'إجمالي قيمة العقود القائمة للمبادرة'
                    }
                }

                this.allTimeSpendingPerformance = {
                    target: {
                        name: 'إجمالي الإرتباطات',
                        value: result.contractsAmount,
                        tooltip: 'إجمالي قيمة العقود القائمة للمبادرة'
                    },
                    actual: {
                        name: 'إجمالي المنصرف',
                        value: result.totalExpenditure,
                        tooltip: `إجمالي المنصرف بنهاية ${DateUtility.getDate()}`
                    }
                }

                this.currentPeriodSpendingPerformance = {
                    target: {
                        name: 'المستهدف',
                        value: result.plannedToDateExpenditure,
                        tooltip: `إجمالي المخطط صرفه بنهاية ${DateUtility.getDate()}`
                    },
                    actual: {
                        name: 'إجمالي المنصرف',
                        value: result.totalExpenditure,
                        tooltip: `إجمالي المنصرف بنهاية ${DateUtility.getDate()}`
                    },
                }

                this.currentPeriodContractingPerformance = {
                    target: {
                        name: 'المستهدف',
                        value: result.plannedToDateContractsAmount,
                        tooltip: `إجمالي مخطط قيمة العقود القائمة بنهاية ${DateUtility.getDate()}`
                    },
                    actual: {
                        name: 'إجمالي الإرتباطات',
                        value: result.contractsAmount,
                        tooltip: 'إجمالي قيمة العقود القائمة للمبادرة'
                    }
                }

                this.milestoneProgressPerformance = {
                    target: {
                        name: 'المعالم المستحقة',
                        value: result.toDateDueMilestones,
                        tooltip: `عدد المعالم المستحقة بنهاية ${DateUtility.getDate()}`
                    },
                    actual: {
                        name: 'المعالم المنجزة',
                        value: result.toDateAchievedMilestones,
                        tooltip: 'عدد المعالم المنجزة حتى تاريخه'
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
