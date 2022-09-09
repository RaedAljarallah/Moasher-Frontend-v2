export interface IOvertimeChart {
    year: number;
    datasets: IOvertimeDataset[]
}

export interface IOvertimeDataset {
    name: string;
    series: IOvertimeDatasetSeries[]
}

export interface IOvertimeDatasetSeries {
    name: string,
    value: number,
    label: string
}