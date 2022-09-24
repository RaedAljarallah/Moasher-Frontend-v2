import {IBaseModel} from "../../../../../core/models/base.model";
import {IEnumValue} from "../../../../../core/models/enum-value.model";

export interface ITeam extends IBaseModel {
    name: string;
    email: string;
    phone: string;
    role: IEnumValue;
    initiativeName: string;
    initiativeId: string;
}