export interface IStatusProgressChart {
    year: number;
    scheme: string[];
    datasets: {name: string, values: {label: string, value: number}[]}[];
    names?: string[];
}