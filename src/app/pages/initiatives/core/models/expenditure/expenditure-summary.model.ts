import {IExpenditure} from "./expenditure.model";

export interface IExpenditureSummary extends IExpenditure {
    budget: number;
    initialPlannedAmountCumulative: number;
    plannedAmountCumulative: number;
    actualAmountCumulative: number;
}