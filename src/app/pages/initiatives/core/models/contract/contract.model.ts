import {IBaseModel} from "../../../../../core/models/base.model";
import {IEnumValue} from "../../../../../core/models/enum-value.model";

export interface IContract extends IBaseModel {
    initiativeId: string;
    projectId: string;
    name: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    refNumber?: string;
    status: IEnumValue;
    supplier?: string;
    currentYearExpenditure?: number;
    plannedExpenditureToDate: number;
    totalExpenditure?: number;
    balancedExpenditurePlan: boolean;
    remaining: number;
}