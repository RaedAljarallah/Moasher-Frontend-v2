import {IMilestone} from "./milestone.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class MilestoneCommand {
    public id!: string;
    public name!: string;
    public plannedFinish!: Date | null;
    public actualFinish?: Date | null;
    public weight!: number;
    public initiativeId!: string;
    public supportingDocument?: string;
    
    constructor(model: IMilestone | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.name = _.get(form.get('name'), 'value', null);
            this.plannedFinish = _.get(form.get('plannedFinish'), 'value', null);
            this.actualFinish = _.get(form.get('actualFinish'), 'value', null);
            this.weight = parseFloat(_.get(form.get('weight'), 'value', null));
            this.initiativeId = _.get(form.get('initiativeId'), 'value', null);
            this.supportingDocument = _.get(form.get('supportingDocument'), 'value', null);
            return;
        }

        this.id = model.id;
        this.name = model.name;
        this.plannedFinish = model.plannedFinish;
        this.actualFinish = model.actualFinish
        this.weight = model.weight;
        this.initiativeId = model.initiativeId;
        this.supportingDocument = model.supportingDocument;
    }
    
    public setInitiativeId(id: string): MilestoneCommand {
        this.initiativeId = id;
        return this;
    }
    
}