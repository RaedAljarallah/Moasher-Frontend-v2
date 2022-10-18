import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../../core/services/api.service";
import {map, finalize} from "rxjs/operators";
import {IPerformanceCardValue} from "../../../shared/charts/models/performance-card-value.model";
import {ChartUtility} from "../../../shared/charts/utilities/chart.utility";
import {IProgressChart} from "../../../shared/charts/models/progress-chart.model";
import {IInitiativeSummary} from "../core/models/IInitiativeSummary.model";
import {DateUtility} from "../../../core/utilities/date.utility";
import {IExpenditureSummary} from "../core/models/expenditure/expenditure-summary.model";
import * as _ from "lodash";
import {IOvertimeChart, IOvertimeDatasetSeries} from "../../../shared/charts/models/overtime-chart.model";
import {MonthUtility} from "../../../core/utilities/month.utility";
import {IFinancialPlanningChart} from "../../../shared/charts/models/financial-planning-chart.model";
import {LocalCurrencyPipe} from "../../../shared/pipes/local-currency.pipe";

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
    public spendingPlan$: Observable<IFinancialPlanningChart[]> = new Observable<IFinancialPlanningChart[]>();
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
                finalize(() => this.isInitiativeSummaryLoading = false),
                map((res) => res.result),
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
    private getSpendingPlan(): Observable<IFinancialPlanningChart[]> {
        return this.api.get<IExpenditureSummary[]>(`expenditures?initiativeId=${this.initiativeId}`).pipe(
            map(res => {
                let years = _.uniq(res.result.map(e => e.year));
                let financialPlanningChart: IFinancialPlanningChart[] = [];
                
                years.forEach(year => {
                    let baselineSeries: IOvertimeDatasetSeries[] = [];  
                    let plannedSeries: IOvertimeDatasetSeries[] = [];
                    let actualSeries: IOvertimeDatasetSeries[] = [];
                    let yearExpenditures = res.result.filter(e => e.year == year);
                    yearExpenditures.forEach(e => {
                        baselineSeries.push({
                            name: `${MonthUtility.parse(e.month.toString())}`,
                            value: e.initialPlannedAmount,
                            label: e.initialPlannedAmount.toString()
                        });
                        plannedSeries.push({
                            name: `${MonthUtility.parse(e.month.toString())}`,
                            value: e.plannedAmount,
                            label: e.plannedAmount.toString()
                        });
                        actualSeries.push({
                            name: `${MonthUtility.parse(e.month.toString())}`,
                            value: e.actualAmount ?? 0,
                            label: (e.actualAmount ?? 0).toString()
                        })
                    });

                    financialPlanningChart.push({
                        year: year,
                        budget: yearExpenditures.find(e => e.budget)?.budget ?? 0,
                        baselineSeries: { name: 'المخطط الأصلي', series: baselineSeries},
                        plannedSeries: { name: 'المخطط المحدث', series: plannedSeries},
                        actualSeries: { name: 'المنصرف الفعلي', series: actualSeries}
                    })
                });
                
                return financialPlanningChart;
            })
        )
    }
    
    
}
