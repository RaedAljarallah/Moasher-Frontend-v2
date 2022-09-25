import {IBaseModel} from "../../../core/models/base.model";

export interface IAnalytic extends IBaseModel {
    description: string;
    analyzedAt: Date;
    analyzedBy: string;
    initiativeName?: string;
    initiativeId?: string;
    kpiName?: string;
    kpiId?: string;
}