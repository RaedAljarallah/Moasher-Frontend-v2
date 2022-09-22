import {IBaseModel} from "../../../../../core/models/base.model";

export interface IApprovedCost extends IBaseModel {
    initiativeId: string;
    approvalDate: Date;
    amount: number;
    supportingDocument?: string;
    initiativeName: string;
}