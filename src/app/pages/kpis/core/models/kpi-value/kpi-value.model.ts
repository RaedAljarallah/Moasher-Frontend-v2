import {IBaseModel} from "../../../../../core/models/base.model";
import {MeasurementPeriod} from "../../../../../core/models/data-types/measurement-period.data-type";

export interface IKpiValue extends IBaseModel {
    kpiId: string;
    year: number;
    measurementPeriod: MeasurementPeriod;
    dataAvailabilityDate?: Date;
    measurementUnit: string;
    targetValue: number;
    actualValue?: number;
    plannedFinish: Date;
    actualFinish?: Date;
    kpiName: string;
}