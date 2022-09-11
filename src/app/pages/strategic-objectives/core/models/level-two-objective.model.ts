import {IStrategicObjectiveBase} from "./strategic-objective-base.model";
import {ILevelOneObjective} from "./level-one-objective.model";

export interface ILevelTwoObjective extends IStrategicObjectiveBase {
    levelOne: ILevelOneObjective;
    levelThreeCount: number;
    levelFourCount: number;
    initiativesCount: number;
    kpIsCount: number;
}