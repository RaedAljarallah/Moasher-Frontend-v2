import {IBaseModel} from "../../../../../core/models/base.model";

export interface IBudget extends IBaseModel {
    initiativeId: string;
    approvalDate: Date;
    amount: number;
    initialAmount: number;
    supportingDocument?: string;
    initiativeName: string;
}