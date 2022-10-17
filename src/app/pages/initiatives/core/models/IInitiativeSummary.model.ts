import {IEnumValue} from "../../../../core/models/enum-value.model";

export interface IInitiativeSummary {
    statuses: IEnumValue[];
    fundStatuses: IEnumValue[];
    plannedProgress: number;
    actualProgress: number;
    requiredCost: number;
    approvedCost: number;
    currentYearBudget: number;
    totalBudget: number;
    contractsAmount: number;
    totalExpenditure: number;
    currentYearExpenditure: number;
    estimatedBudgetAtCompletion: number;
    plannedToDateExpenditure: number;
    plannedToDateContractsAmount: number;
    toDateDueMilestones: number;
    toDateAchievedMilestones: number;
}