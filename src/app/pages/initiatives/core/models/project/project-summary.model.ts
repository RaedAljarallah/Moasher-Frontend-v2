export interface IProjectSummary {
    year: number;
    month: number;
    initialPlannedAmount: number;
    plannedAmount: number;
    actualAmount?: number;
    initialPlannedAmountCumulative: number;
    plannedAmountCumulative: number;
    actualAmountCumulative: number;
    approvedCost: number;
    initiativeId?: string
}