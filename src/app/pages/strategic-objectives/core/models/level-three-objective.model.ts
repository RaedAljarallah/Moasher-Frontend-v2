import {IStrategicObjectiveBase} from "./strategic-objective-base.model";
import {ILevelOneObjective} from "./level-one-objective.model";
import {ILevelTwoObjective} from "./level-two-objective.model";

export interface ILevelThreeObjective extends IStrategicObjectiveBase{
    levelOne: ILevelOneObjective;
    levelTwo: ILevelTwoObjective;
    levelFourCount: number;
    initiativesCount: number;
    kpIsCount: number;
}