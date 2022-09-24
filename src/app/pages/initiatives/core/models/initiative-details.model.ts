import {IInitiative} from "./initiative.model";
import {ITeam} from "./team/team.model";

export interface IInitiativeDetails extends IInitiative {
    teams: ITeam[]
}