import {IBaseModel} from "../../../../core/models/base.model";

export interface IEntity extends IBaseModel {
    code: string,
    name: string,
    strategicObjectivesCount: number,
    initiativesCount: number,
    kpIsCount: number
}