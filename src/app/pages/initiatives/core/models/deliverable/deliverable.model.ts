import {IBaseModel} from "../../../../../core/models/base.model";

export interface IDeliverable extends IBaseModel {
    initiativeId: string;
    name: string;
    plannedFinish: Date;
    actualFinish?: Date;
    status: string;
    supportingDocument?: string;
    initiativeName: string;
    entityName: string;
}