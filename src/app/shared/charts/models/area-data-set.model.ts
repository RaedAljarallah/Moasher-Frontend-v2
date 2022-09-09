export interface IAreaDateSet {
    xTicks: string[];
    peakTitles: { area: string, title: string }[];
    firstArea: {
        title: string;
        values: string[];
        labels: string[];
    };
    secondArea: {
        title: string;
        values: string[];
        labels: string[];
    };
}