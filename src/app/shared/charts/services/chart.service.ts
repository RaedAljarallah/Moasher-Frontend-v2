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
import {IStatusProgressChart} from "../models/status-progress-chart.model";
import {IInitiativeStatusProgress} from "../../../pages/initiatives/core/models/initiative-status-progress.model";
import {IProgressChart} from "../models/progress-chart.model";
import {IKpi} from "../../../pages/kpis/core/models/kpi.model";
import {IKpiValue} from "../../../pages/kpis/core/models/kpi-value/kpi-value.model";
import {IStatusSummaryChart} from "../models/status-summary-chart.model";

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
    
    public getInitiativeProgressOvertime(initiativeId: string): Observable<IProgressOvertimeChart[]> {
        const httpParams = new HttpParams().append('id', initiativeId);
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
    
    public getInitiativesStatusProgress(params: {key: string, value: string}): Observable<IStatusProgressChart[]> {
        const httpParams = new HttpParams().append(params.key, params.value);
        return this.api.get<IInitiativeStatusProgress[]>('initiatives/status-progress', { params: httpParams}).pipe(
            map(res => {
                return ChartUtility.generateStatusProgressChart(res.result);
            })
        )
    }

    public getKpisStatusProgress(params: {key: string, value: string}): Observable<IStatusProgressChart[]> {
        const httpParams = new HttpParams().append(params.key, params.value);
        return this.api.get<IInitiativeStatusProgress[]>('kpis/status-progress', { params: httpParams}).pipe(
            map(res => {
                return ChartUtility.generateStatusProgressChart(res.result);
            })
        )
    }
    
    public getKpisStatuses(params: {key: string, value: string}): Observable<IStatusSummaryChart> {
        const httpParams = new HttpParams().append(params.key, params.value);
        return this.api.get<IKpi[]>('kpis', { params: httpParams}).pipe(
            map(res => {
                const statuses = res.result.map(k => k.status ?? {});
                return ChartUtility.generateStatusSummaryChart(statuses);
            })
        )
    }
    
    public getKpiProgress(kpiId: string): Observable<IProgressChart> {
        return this.api.get<IKpi[]>('kpis', { params: new HttpParams().append('id', kpiId)}).pipe(
            map(res => {
                const result = res.result[0];
                return {
                    planned: result.plannedProgress ?? 0,
                    actual: result.actualProgress ?? 0,
                    status: result.status ?? {}
                }
            })
        )
    }
    
    public getKpiValuesProgress(params: {key: string, value: string}): Observable<IPerformanceCardValue> {
        const httpParams = new HttpParams().append(params.key, params.value);
        const currentDate = DateUtility.getDate();
        const completedValues = this.api.get<IKpiValue[]>('kpi-values?status=completed', { params: httpParams }).pipe(
            map(res => res.result)
        );
        const plannedValues = this.api.get<IKpiValue[]>(`kpi-values?plannedTo=${currentDate}`, { params: httpParams }).pipe(
            map(res => res.result)
        );
        return forkJoin([completedValues, plannedValues]).pipe(
            map(res => {
                return {
                    target: {
                        name: 'المستهدفات المستحقة',
                        value: res[1].length,
                        tooltip: `عدد المستهدفات المستحقة بنهاية ${DateUtility.getDate()}`
                    },
                    actual: {
                        name: 'المستهدفات المنجزة',
                        value: res[0].length,
                        tooltip: 'عدد المستهدفات المنجزة حتى تاريخه'
                    }
                }
            })
        )
    }

    public getKpiProgressOvertime(kpiId: string): Observable<IProgressOvertimeChart[]> {
        const httpParams = new HttpParams().append('id', kpiId);
        return this.api.get<IInitiativeProgress[]>('kpis/progress', { params: httpParams }).pipe(
            map(res => {
                return ChartUtility.generateProgressOvertimeChart(res.result);
            })
        )
    }
}
