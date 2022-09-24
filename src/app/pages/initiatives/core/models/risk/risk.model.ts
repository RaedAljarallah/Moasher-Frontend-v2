import {IBaseModel} from "../../../../../core/models/base.model";
import {IEnumValue} from "../../../../../core/models/enum-value.model";

export interface IRisk extends IBaseModel {
    initiativeId: string;
    description: string;
    type: IEnumValue;
    priority: IEnumValue;
    probability: IEnumValue;
    impact: IEnumValue;
    scope: IEnumValue;
    impactDescription: string;
    owner: string;
    responsePlane: string;
    raisedAt: Date;
    raisedBy: string;
    initiativeName: string;
    entityName: string;
}