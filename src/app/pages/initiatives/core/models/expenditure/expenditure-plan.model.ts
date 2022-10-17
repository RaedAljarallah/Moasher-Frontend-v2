    export interface IExpenditurePlan {
    year: number,
    expenditures: {
        month: number,
        plannedAmount: number,
        actualAmount?: number
    }[]
}