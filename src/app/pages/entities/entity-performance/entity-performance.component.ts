import {Component, Input, OnInit} from '@angular/core';
import {IPerformanceCardValue} from "../../../shared/charts/models/performance-card-value.model";
import {ApiService} from "../../../core/services/api.service";
import {IInitiativeFinancialSummaryChart} from "../../../shared/charts/models/initiative-financial-summary-chart.model";
import {map} from "rxjs/operators";
import {IProgressChart} from "../../../shared/charts/models/progress-chart.model";
import {forkJoin, Observable} from "rxjs";
import {IFinancialPlanningChart} from "../../../shared/charts/models/financial-planning-chart.model";
import {IProgressOvertimeChart} from "../../../shared/charts/models/progress-overtime-chart.model";
import {IInitiativeSummary} from "../../initiatives/core/models/initiative-summary.model";
import {DateUtility} from "../../../core/utilities/date.utility";
import {IExpenditureSummary} from "../../initiatives/core/models/expenditure/expenditure-summary.model";
import {ChartUtility} from "../../../shared/charts/utilities/chart.utility";
import {IProjectSummary} from "../../initiatives/core/models/project/project-summary.model";
import {IStatusSummaryChart} from "../../../shared/charts/models/status-summary-chart.model";
import {IEnumValue} from "../../../core/models/enum-value.model";
import * as _ from "lodash";
import {EnumValueUtility} from "../../../core/utilities/enum-value.utility";
import {IMilestone} from "../../initiatives/core/models/milestone/milestone.model";
import {IInitiativeProgress} from "../../initiatives/core/models/initiative-progress.model";

@Component({
    selector: 'app-entity-performance',
    templateUrl: './entity-performance.component.html',
    styles: []
})
export class EntityPerformanceComponent implements OnInit {
    @Input() entityId: string = '';
    public estimateAtCompletion?: IPerformanceCardValue;
    public currentPeriodContractingPerformance?: IPerformanceCardValue;
    public currentPeriodSpendingPerformance?: IPerformanceCardValue;
    public allTimeSpendingPerformance?: IPerformanceCardValue;
    public fundingPerformance?: IPerformanceCardValue;
    public contractingPerformance?: IPerformanceCardValue;
    public initiativesStatus?: IStatusSummaryChart;
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
        this.api.get<IInitiativeSummary>(`initiatives/summary?entityId=${this.entityId}`)
            .pipe(map(res => res.result))
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
                        value: result.plannedToDateContractsAmount + result.contractsAmount,
                        tooltip: `إجمالي مخطط قيمة العقود القائمة بنهاية ${DateUtility.getDate()}`
                    },
                    actual: {
                        name: 'إجمالي الإرتباطات',
                        value: result.contractsAmount,
                        tooltip: 'إجمالي قيمة العقود القائمة للمبادرة'
                    }
                }
                
                this.initiativesStatus = ChartUtility.generateStatusSummaryChart(result.statuses);
        })
    }
    
    private getSpendingPlan(): Observable<IFinancialPlanningChart[]> {
        return this.api.get<IExpenditureSummary[]>(`expenditures?entityId=${this.entityId}`).pipe(
            map(res => {
                return ChartUtility.generateFinancialPlanningChart(res.result, 'expenditures');
            })
        )
    }

    private getContractingPlan(): Observable<IFinancialPlanningChart[]> {
        return this.api.get<IProjectSummary[]>(`projects/summary?entityId=${this.entityId}`).pipe(
            map(res => {
                return ChartUtility.generateFinancialPlanningChart(res.result, 'contracts');
            })
        )
    }

    private getProgressOvertime(): Observable<IProgressOvertimeChart[]> {
        return this.api.get<IInitiativeProgress[]>(`initiatives/progress?entityId=${this.entityId}`).pipe(
            map(res => {
                return ChartUtility.generateProgressOvertimeChart(res.result);
            })
        )
    }
    
    private getMilestonesProgress(): Observable<IPerformanceCardValue> {
        let currentDate = DateUtility.getDate();
        let completedMilestones = this.api.get<IMilestone[]>(`milestones?entityId=${this.entityId}&status=completed`).pipe(
            map(res => res.result)
        );
        let plannedMilestones = this.api.get<IMilestone[]>(`milestones?entityId=${this.entityId}&plannedTo=${currentDate}`).pipe(
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
