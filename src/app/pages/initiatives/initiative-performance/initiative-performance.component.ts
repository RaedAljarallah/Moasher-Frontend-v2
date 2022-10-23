import {Component, Input, OnInit} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {ApiService} from "../../../core/services/api.service";
import {map, finalize} from "rxjs/operators";
import {IPerformanceCardValue} from "../../../shared/charts/models/performance-card-value.model";
import {IProgressChart} from "../../../shared/charts/models/progress-chart.model";
import {DateUtility} from "../../../core/utilities/date.utility";
import {IExpenditureSummary} from "../core/models/expenditure/expenditure-summary.model";
import {IFinancialPlanningChart} from "../../../shared/charts/models/financial-planning-chart.model";
import {IProjectSummary} from "../core/models/project/project-summary.model";
import {ChartUtility} from "../../../shared/charts/utilities/chart.utility";
import {IInitiativeProgress} from "../core/models/initiative-progress.model";
import {IInitiativeSummary} from "../core/models/initiative-summary.model";
import {IProgressOvertimeChart} from "../../../shared/charts/models/progress-overtime-chart.model";
import {IMilestone} from "../core/models/milestone/milestone.model";

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
    public milestoneProgressPerformance$: Observable<IPerformanceCardValue> = new Observable<IPerformanceCardValue>();
    public spendingPlan$: Observable<IFinancialPlanningChart[]> = new Observable<IFinancialPlanningChart[]>();
    public contractingPlan$: Observable<IFinancialPlanningChart[]> = new Observable<IFinancialPlanningChart[]>();
    public progressOvertime$: Observable<IProgressOvertimeChart[]> = new Observable<IProgressOvertimeChart[]>();
    public spendingYear: number = new Date().getFullYear();

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.getInitiativeSummary();
        this.spendingPlan$ = this.getSpendingPlan();
        this.contractingPlan$ = this.getContractingPlan();
        this.progressOvertime$ = this.getProgressOvertime();
        this.milestoneProgressPerformance$ = this.getMilestonesProgress();
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
                return ChartUtility.generateFinancialPlanningChart(res.result, 'expenditures');
            })
        )
    }
    
    private getContractingPlan(): Observable<IFinancialPlanningChart[]> {
        return this.api.get<IProjectSummary[]>(`projects/summary?initiativeId=${this.initiativeId}`).pipe(
            map(res => {
                return ChartUtility.generateFinancialPlanningChart(res.result, 'contracts');
            })
        )
    }
    
    private getProgressOvertime(): Observable<IProgressOvertimeChart[]> {
        return this.api.get<IInitiativeProgress[]>(`initiatives/progress?initiativeId=${this.initiativeId}`).pipe(
            map(res => {
                return ChartUtility.generateProgressOvertimeChart(res.result);
            })
        )
    }
    
    private getMilestonesProgress(): Observable<IPerformanceCardValue> {
        let currentDate = DateUtility.getDate();
        let completedMilestones = this.api.get<IMilestone[]>(`milestones?initiativeId=${this.initiativeId}&status=completed`).pipe(
            map(res => res.result)
        );
        let plannedMilestones = this.api.get<IMilestone[]>(`milestones?initiativeId=${this.initiativeId}&plannedTo=${currentDate}`).pipe(
            map(res => res.result)
        );
        return forkJoin([completedMilestones, plannedMilestones]).pipe(
            map(res => {
                return {
                    target: {
                        name: 'المعالم المستحقة',
                        value: res[1].length,
                        tooltip: `عدد المعالم المستحقة بنهاية ${DateUtility.getDate()}`
                    },
                    actual: {
                        name: 'المعالم المنجزة',
                        value: res[0].length,
                        tooltip: 'عدد المعالم المنجزة حتى تاريخه'
                    }
                }
            })
        )
    }
}
