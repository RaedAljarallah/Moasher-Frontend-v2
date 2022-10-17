import {IExpenditure} from "./expenditure.model";

export interface IExpenditureSummary extends IExpenditure {
    initialPlannedAmountCumulative: number,
    plannedAmountCumulative: number,
    actualAmountCumulative: number
}