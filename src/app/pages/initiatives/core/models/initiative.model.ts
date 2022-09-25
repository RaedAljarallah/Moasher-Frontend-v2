import {IBaseModel} from "../../../../core/models/base.model";
import {IEnumValue} from "../../../../core/models/enum-value.model";

export interface IInitiative extends IBaseModel {
    unifiedCode: string,
    codeByProgram: string,
    name: string,
    scope: string,
    targetSegment: string,
    contributionOnStrategicObjective: string,
    status?: IEnumValue,
    fundStatus: IEnumValue,
    plannedStart: Date,
    plannedFinish: Date,
    actualStart?: Date,
    actualFinish? : Date,
    requiredCost: number,
    capexCode: string,
    opexCode: string,
    entityName: string,
    portfolioName: string,
    programName: string,
    levelOneStrategicObjectiveName: string,
    levelTwoStrategicObjectiveName: string,
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