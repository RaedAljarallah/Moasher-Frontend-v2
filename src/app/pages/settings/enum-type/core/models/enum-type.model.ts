import {IBaseModel} from "../../../../../core/models/base.model";

export interface IEnumType extends IBaseModel {
    category: string;
    name: string;
    style: string;
    metadata?: { [key: string]: string } 
}