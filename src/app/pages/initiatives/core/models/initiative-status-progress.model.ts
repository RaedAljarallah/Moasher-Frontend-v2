import {IEnumValue} from "../../../../core/models/enum-value.model";

export interface IInitiativeStatusProgress {
    year: number;
    month: string;
    progress: { status: IEnumValue, count: number } [];
}