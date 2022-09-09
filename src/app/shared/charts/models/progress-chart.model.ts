import {IEnumValue} from "../../../core/models/enum-value.model";

export interface IProgressChart {
    planned: number;
    actual: number;
    status: IEnumValue
}