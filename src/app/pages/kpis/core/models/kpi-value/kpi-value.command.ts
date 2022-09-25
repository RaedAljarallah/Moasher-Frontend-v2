import {MeasurementPeriod} from "../../../../../core/models/data-types/measurement-period.data-type";
import {Frequency} from "../../../../../core/models/data-types/frequency.data-type";
import {IKpiValue} from "./kpi-value.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class KpiValueCommand {
    public id!: string;
    public measurementPeriod!: MeasurementPeriod;
    public year!: number;
    public targetValue!: number;
    public actualValue?: number;
    public plannedFinish!: Date | null;
    public actualFinish?: Date | null;
    public kpiId!: string;

    public frequency!: Frequency;
    
    constructor(model: IKpiValue | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.measurementPeriod = _.get(form.get('measurementPeriod'), 'value', null);
            this.year = parseInt(_.get(form.get('year'), 'value', null));
            this.targetValue = parseFloat(_.get(form.get('targetValue'), 'value', null));
            this.actualValue = parseFloat(_.get(form.get('actualValue'), 'value', null));
            this.plannedFinish = _.get(form.get('plannedFinish'), 'value', null);
            this.actualFinish = _.get(form.get('actualFinish'), 'value', null);
            this.kpiId = _.get(form.get('kpiId'), 'value', null);
            return;
        }

        this.id = model.id;
        this.measurementPeriod = model.measurementPeriod;
        this.year = model.year;
        this.targetValue = model.targetValue;
        this.actualValue = model.actualValue;
        this.plannedFinish = model.plannedFinish;
        this.actualFinish = model.actualFinish
        this.kpiId = model.kpiId;
    }
    
    public setKpiId(id: string): KpiValueCommand {
        this.kpiId = id;
        return this;
    }
    
    public setFrequency(frequency: Frequency): KpiValueCommand {
        this.frequency = frequency;
        return this;
    }
}