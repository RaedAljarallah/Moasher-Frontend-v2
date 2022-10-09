import {IProject} from "./project.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {IEnumType} from "../../../../settings/enum-type/core/models/enum-type.model";

export class ProjectCommand {
    public id!: string;
    public name!: string;
    public plannedBiddingDate!: Date | null;
    public actualBiddingDate?: Date | null;
    public plannedContractingDate!: Date | null;
    public estimatedAmount!: number;
    public duration!: number;
    public phaseEnumId!: string;
    public initiativeId!: string;

    public phase!: IEnumType;
    constructor(model: IProject | FormGroup | null) {
        if (model === null) {
            return;
        }
        
        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.name = _.get(form.get('name'), 'value', null);
            this.plannedBiddingDate = _.get(form.get('plannedBiddingDate'), 'value', null);
            this.actualBiddingDate = _.get(form.get('actualBiddingDate'), 'value', null);
            this.plannedContractingDate = _.get(form.get('plannedContractingDate'), 'value', null);
            this.estimatedAmount = parseFloat(_.get(form.get('estimatedAmount'), 'value', null));
            this.duration = parseFloat(_.get(form.get('duration'), 'value', null));
            this.phaseEnumId = _.get(form.get('phaseEnumId'), 'value', null);
            this.initiativeId = _.get(form.get('initiativeId'), 'value', null);
            return;
        }

        this.id = model.id;
        this.name = model.name;
        this.plannedBiddingDate = model.plannedBiddingDate;
        this.actualBiddingDate = model.actualBiddingDate;
        this.plannedContractingDate = model.plannedContractingDate;
        this.estimatedAmount = model.estimatedAmount;
        this.duration = model.duration;
        this.initiativeId = model.initiativeId;
    }

    public setInitiativeId(id: string): ProjectCommand {
        this.initiativeId = id;
        return this;
    }
}