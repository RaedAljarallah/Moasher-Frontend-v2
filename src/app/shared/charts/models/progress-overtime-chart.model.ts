import {IOvertimeDataset} from "./overtime-chart.model";

export interface IProgressOvertimeChart {
    year: number;
    plannedSeries: IOvertimeDataset;
    actualSeries: IOvertimeDataset;
}