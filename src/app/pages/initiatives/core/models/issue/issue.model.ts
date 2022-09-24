import {IBaseModel} from "../../../../../core/models/base.model";
import {IEnumValue} from "../../../../../core/models/enum-value.model";

export interface IIssue extends IBaseModel {
    initiativeId: string;
    description: string;
    scope: IEnumValue;
    status: IEnumValue;
    impact: IEnumValue;
    impactDescription: string;
    source: string;
    reason: string;
    resolution: string;
    estimatedResolutionDate: Date;
    raisedAt: Date;
    raisedBy: string;
    closedAt?: Date;
    initiativeName: string;
    entityName: string;
}