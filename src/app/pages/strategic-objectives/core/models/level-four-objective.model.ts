import {IStrategicObjectiveBase} from "./strategic-objective-base.model";
import {ILevelOneObjective} from "./level-one-objective.model";
import {ILevelTwoObjective} from "./level-two-objective.model";
import {ILevelThreeObjective} from "./level-three-objective.model";

export interface ILevelFourObjective extends IStrategicObjectiveBase {
    levelOne: ILevelOneObjective
    levelTwo: ILevelTwoObjective
    levelThree: ILevelThreeObjective
    initiativesCount: number;
    kpIsCount: number;
}