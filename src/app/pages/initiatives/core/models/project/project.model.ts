import {IBaseModel} from "../../../../../core/models/base.model";
import {IEnumValue} from "../../../../../core/models/enum-value.model";

export interface IProject extends IBaseModel {
    initiativeId: string;
    name: string;
    plannedBiddingDate: Date;
    actualBiddingDate? :Date;
    plannedContractingDate: Date;
    estimatedAmount: number;
    duration: number;
    phase: IEnumValue;
    status: string;
}