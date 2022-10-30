import {IBaseModel} from "../../../../core/models/base.model";

export interface IUser extends IBaseModel {
    firstName: string;
    lastName: string;
    role: string;
    localizedRole: string;
    email: string;
    phoneNumber: string;
    entityName: string;
    isActive: boolean;
    isSuspended: boolean;
}