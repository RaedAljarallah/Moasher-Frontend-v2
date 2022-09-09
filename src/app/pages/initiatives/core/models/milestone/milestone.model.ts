import {IBaseModel} from "../../../../../core/models/base.model";

export interface IMilestone extends IBaseModel {
    initiativeId: string;
    name: string;
    plannedFinish: Date;
    actualFinish?: Date;
    weight: number;
    status: string;
    supportingDocument?: string;
    initiativeName: string;
    entityName: string;
}