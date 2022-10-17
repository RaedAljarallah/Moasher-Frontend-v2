﻿import {IEnumValue} from "../../../core/models/enum-value.model";
//TODO: To be deleted
export interface IInitiativeFinancialSummaryChart {
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
}