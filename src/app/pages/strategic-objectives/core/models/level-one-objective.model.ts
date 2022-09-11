import {IStrategicObjectiveBase} from "./strategic-objective-base.model";

export interface ILevelOneObjective extends IStrategicObjectiveBase{
    levelTwoCount: number;
    levelThreeCount: number;
    levelFourCount: number;
    initiativesCount: number;
    kpIsCount: number;
}