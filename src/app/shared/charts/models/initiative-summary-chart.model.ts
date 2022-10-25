import {IPerformanceCardValue} from "./performance-card-value.model";
import {IStatusSummaryChart} from "./status-summary-chart.model";
import {IProgressChart} from "./progress-chart.model";

export interface IInitiativeSummaryChart {
    estimateAtCompletion: IPerformanceCardValue;
    currentPeriodContractingPerformance: IPerformanceCardValue;
    currentPeriodSpendingPerformance: IPerformanceCardValue;
    allTimeSpendingPerformance: IPerformanceCardValue;
    fundingPerformance: IPerformanceCardValue;
    contractingPerformance: IPerformanceCardValue;
    initiativeProgress: IProgressChart
    initiativesStatus: IStatusSummaryChart;
}