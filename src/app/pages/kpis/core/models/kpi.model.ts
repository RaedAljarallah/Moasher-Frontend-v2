import {IBaseModel} from "../../../../core/models/base.model";
import {Frequency} from "../../../../core/models/data-types/frequency.data-type";
import {Polarity} from "../../../../core/models/data-types/polarity.data-type";
import {ValidationStatus} from "../../../../core/models/data-types/validation-status.data-type";
import {IEnumValue} from "../../../../core/models/enum-value.model";

export interface IKpi extends IBaseModel{
    code: string;
    name: string;
    ownerName: string;
    ownerEmail: string;
    ownerPosition?: string;
    ownerPhoneNumber?: string;
    frequency: Frequency;
    polarity: Polarity;
    validationStatus: ValidationStatus;
    startDate: Date,
    endDate: Date,
    formula?: string;
    baselineValue?: number;
    baselineYear?: number;
    measurementUnit?: string;
    dataSource?: string;
    description?: string;
    plannedProgress?: number;
    actualProgress?: number;
    status?: IEnumValue;
    entityName: string;
    levelOneStrategicObjectiveName: string,
    levelTwoStrategicObjectiveName: string,
    levelThreeStrategicObjectiveName: string;
    levelFourStrategicObjectiveName?: string;
}