import {IBaseModel} from "../../../../core/models/base.model";

export interface IStrategicObjectiveBase extends IBaseModel {
    code: string;
    name: string;
    hierarchyId: string;
    level: number;
}