import {IBaseModel} from "../../../../core/models/base.model";

export interface IInitiative extends IBaseModel {
    unifiedCode: string,
    codeByProgram: string,
    name: string,
    scope: string,
    targetSegment: string,
    contributionOnStrategicObjective: string,
    status: string,
    fundStatus: string,
    plannedStart: Date,
    plannedFinish: Date,
    actualStart?: Date,
    actualFinish? : Date,
    requiredCost: number,
    cAPEXCode: string,
    oPEXCode: string,
    entityName: string,
    portfolioName: string,
    programName: string,
    levelThreeStrategicObjectiveName: string,
    levelFourStrategicObjectiveName: string,
    plannedProgress?: number;
    actualProgress?: number;
    approvedCost: number,
    totalBudget: number,
    currentYearBudget: number,
    contractsAmount: number,
    totalExpenditure: number,
    currentYearExpenditure: number,
}