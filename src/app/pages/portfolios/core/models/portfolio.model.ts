import {IBaseModel} from "../../../../core/models/base.model";
import {IEnumValue} from "../../../../core/models/enum-value.model";

export interface IPortfolio extends IBaseModel {
    code: string;
    name: string;
    status: IEnumValue;
    initiativesCount: number;
}