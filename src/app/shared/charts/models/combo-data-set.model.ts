// TODO: To Be Deleted
export interface IComboDataSet {
    xTicks: string[];
    baseline: {
        title: string;
        values: string[];
        labels: string[];
    };
    plan: {
        title: string;
        values: string[];
        labels: string[];
    };
    actual: {
        title: string;
        values: string[];
        labels: string[];
    };
}