import {IBaseModel} from "../../../../../core/models/base.model";

export interface IExpenditure extends IBaseModel {
    year: number;
    month: number;
    initialPlannedAmount: number;
    plannedAmount: number;
    actualAmount?: number;
    projectId?: string;
    contractId?: string;
    initiativeId?: string
}