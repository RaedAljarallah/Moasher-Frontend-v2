import {IOvertimeDataset} from "./overtime-chart.model";

export interface IProgressOvertimeChart {
    year: number;
    plannedSeries: IOvertimeDataset;
    actualSeries: IOvertimeDataset;
    peakTitles?: { id: string, title: string }[];
}