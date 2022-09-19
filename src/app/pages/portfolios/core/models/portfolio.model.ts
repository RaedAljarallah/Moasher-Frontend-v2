import {IBaseModel} from "../../../../core/models/base.model";

export interface IPortfolio extends IBaseModel {
    code: string;
    name: string;
    initiativesCount: number;
}