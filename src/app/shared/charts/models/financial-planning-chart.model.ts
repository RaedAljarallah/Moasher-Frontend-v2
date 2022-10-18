import {IOvertimeDataset} from "./overtime-chart.model";

export interface IFinancialPlanningChart {
    year: number,
    budget: number,
    baselineSeries: IOvertimeDataset,
    plannedSeries: IOvertimeDataset,
    actualSeries: IOvertimeDataset
}