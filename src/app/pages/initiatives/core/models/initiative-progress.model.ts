import {IEnumValue} from "../../../../core/models/enum-value.model";

export interface IInitiativeProgress {
    year: number;
    month: number;
    plannedProgressCumulative: number;
    actualProgressCumulative: number;
    status?: IEnumValue;
}