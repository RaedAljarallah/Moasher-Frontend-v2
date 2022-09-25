import {IAnalytic} from "./analytic.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class AnalyticCommand {
    public id!: string;
    public description!: string;
    public analyzedBy!: string;
    public analyzedAt!: Date | null;
    public initiativeId?: string;
    public kpiId?: string;

    constructor(model: IAnalytic | FormGroup | null){
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.description = _.get(form.get('description'), 'value', null);
            this.analyzedBy = _.get(form.get('analyzedBy'), 'value', null);
            this.analyzedAt = _.get(form.get('analyzedAt'), 'value', null);
            this.initiativeId = _.get(form.get('initiativeId'), 'value', null);
            this.kpiId = _.get(form.get('kpiId'), 'value', null);
            return;
        }

        this.id = model.id;
        this.description = model.description;
        this.analyzedBy = model.analyzedBy;
        this.analyzedAt = model.analyzedAt;
        this.initiativeId = model.initiativeId;
        this.kpiId = model.kpiId;
    }
    
    public setParentId(id: string, parentType: 'initiative' | 'KPI'): AnalyticCommand {
        if (parentType === 'initiative') {
            this.initiativeId = id;
        } else {
            this.kpiId = id;
        }
        
        return this;
    }
}