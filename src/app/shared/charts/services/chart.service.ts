import {Injectable} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {IInitiativeSummaryChart} from "../models/initiative-summary-chart.model";
import {IInitiativeSummary} from "../../../pages/initiatives/core/models/initiative-summary.model";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {forkJoin, Observable} from "rxjs";
import {DateUtility} from "../../../core/utilities/date.utility";
import {ChartUtility} from "../utilities/chart.utility";
import {IFinancialPlanningChart} from "../models/financial-planning-chart.model";
import {IExpenditureSummary} from "../../../pages/initiatives/core/models/expenditure/expenditure-summary.model";
import {IProjectSummary} from "../../../pages/initiatives/core/models/project/project-summary.model";
import {IProgressOvertimeChart} from "../models/progress-overtime-chart.model";
import {IInitiativeProgress} from "../../../pages/initiatives/core/models/initiative-progress.model";
import {IPerformanceCardValue} from "../models/performance-card-value.model";
import {IMilestone} from "../../../pages/initiatives/core/models/milestone/milestone.model";

@Injectable({
    providedIn: 'root'
})
export class ChartService {

    constructor(private api: ApiService) {
    }
    
    public getInitiativeSummary(params: {key: string, value: string}): Observable<IInitiativeSummaryChart> {
        const httpParams = new HttpParams().append(params.key, params.value);
        return this.api.get<IInitiativeSummary>('initiatives/summary', { params: httpParams }).pipe(
            map(res => {
                return {
                    fundingPerformance: {
                        target: {
                            name: 'التكاليف المطلوبة',
                            value: res.result.requiredCost,
                            tooltip: 'التكاليف المطلوبة في خطة تنفيذ البرنامج'
                        },
                        actual: {
                            name: 'التكاليف المعتمدة',
                            value: res.result.approvedCost,
                            tooltip: 'التكاليف المعتمدة من اللجنة الإستراتيجية'
                        }
                    },

                    estimateAtCompletion: {
                        target: {
                            name: 'التكاليف المطلوبة',
                            value: res.result.requiredCost,
                            tooltip: 'التكاليف المطلوبة في خطة تنفيذ البرنامج'
                        },
                        actual: {
                            name: 'التكاليف المتوقعة للإكمال',
                            value: res.result.estimatedBudgetAtCompletion,
                            tooltip: 'التكاليف المتوقعة لإكمال المبادرة'
                        }
                    },

                    contractingPerformance: {
                        target: {
                            name: 'التكاليف المعتمدة',
                            value: res.result.approvedCost,
                            tooltip: 'التكاليف المعتمدة من اللجنة الإستراتيجية'
                        },
                        actual: {
                            name: 'إجمالي الإرتباطات',
                            value: res.result.contractsAmount,
                            tooltip: 'إجمالي قيمة العقود القائمة للمبادرة'
                        }
                    },

                    allTimeSpendingPerformance: {
                        target: {
                            name: 'إجمالي الإرتباطات',
                            value: res.result.contractsAmount,
                            tooltip: 'إجمالي قيمة العقود القائمة للمبادرة'
                        },
                        actual: {
                            name: 'إجمالي المنصرف',
                            value: res.result.totalExpenditure,
                            tooltip: `إجمالي المنصرف بنهاية ${DateUtility.getDate()}`
                        }
                    },

                    currentPeriodSpendingPerformance: {
                        target: {
                            name: 'المستهدف',
                            value: res.result.plannedToDateExpenditure,
                            tooltip: `إجمالي المخطط صرفه بنهاية ${DateUtility.getDate()}`
                        },
                        actual: {
                            name: 'إجمالي المنصرف',
                            value: res.result.totalExpenditure,
                            tooltip: `إجمالي المنصرف بنهاية ${DateUtility.getDate()}`
                        }
                    },

                    currentPeriodContractingPerformance: {
                        target: {
                            name: 'المستهدف',
                            value: res.result.plannedToDateContractsAmount + res.result.contractsAmount,
                            tooltip: `إجمالي مخطط قيمة العقود القائمة بنهاية ${DateUtility.getDate()}`
                        },
                        actual: {
                            name: 'إجمالي الإرتباطات',
                            value: res.result.contractsAmount,
                            tooltip: 'إجمالي قيمة العقود القائمة للمبادرة'
                        }
                    },
                    initiativeProgress: {
                        planned: res.result.plannedProgress,
                        actual: res.result.actualProgress,
                        status: res.result.statuses[0]
                    },
                    
                    initiativesStatus: ChartUtility.generateStatusSummaryChart(res.result.statuses)
                }
            })
        )
    }
    
    public getSpendingPlan(params: {key: string, value: string}): Observable<IFinancialPlanningChart[]> {
        const httpParams = new HttpParams().append(params.key, params.value);
        return this.api.get<IExpenditureSummary[]>('expenditures', { params: httpParams }).pipe(
            map(res => {
                return ChartUtility.generateFinancialPlanningChart(res.result, 'expenditures');
            })
        )
    }
    
    public getContractingPlan(params: {key: string, value: string}): Observable<IFinancialPlanningChart[]> {
        const httpParams = new HttpParams().append(params.key, params.value);
        return this.api.get<IProjectSummary[]>('projects/summary', { params: httpParams }).pipe(
            map(res => {
                return ChartUtility.generateFinancialPlanningChart(res.result, 'contracts');
            })
        )
    }
    
    public getProgressOvertime(params: {key: string, value: string}): Observable<IProgressOvertimeChart[]> {
        const httpParams = new HttpParams().append(params.key, params.value);
        return this.api.get<IInitiativeProgress[]>('initiatives/progress', { params: httpParams }).pipe(
            map(res => {
                return ChartUtility.generateProgressOvertimeChart(res.result);
            })
        )
    }
    
    public getMilestonesProgress(params: {key: string, value: string}): Observable<IPerformanceCardValue> {
        const httpParams = new HttpParams().append(params.key, params.value);
        const currentDate = DateUtility.getDate();
        const completedMilestones = this.api.get<IMilestone[]>('milestones?status=completed', { params: httpParams }).pipe(
            map(res => res.result)
        );
        const plannedMilestones = this.api.get<IMilestone[]>(`milestones?plannedTo=${currentDate}`, { params: httpParams }).pipe(
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
