import {IEnumType} from "../../../../settings/enum-type/core/models/enum-type.model";
import {IRisk} from "./risk.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class RiskCommand {
    public id!: string;
    public description!: string;
    public impactDescription!: string;
    public owner!: string;
    public responsePlane!: string;
    public raisedBy!: string;
    public raisedAt!: Date | null;
    public typeEnumId!: string;
    public priorityEnumId!: string;
    public probabilityEnumId!: string;
    public impactEnumId!: string;
    public scopeEnumId!: string;
    public initiativeId!: string;

    public type!: IEnumType;
    public priority!: IEnumType;
    public probability!: IEnumType;
    public impact!: IEnumType;
    public scope!: IEnumType;

    constructor(model: IRisk | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.description = _.get(form.get('description'), 'value', null);
            this.impactDescription = _.get(form.get('impactDescription'), 'value', null);
            this.owner = _.get(form.get('owner'), 'value', null);
            this.responsePlane = _.get(form.get('responsePlane'), 'value', null);
            this.raisedBy = _.get(form.get('raisedBy'), 'value', null);
            this.raisedAt = _.get(form.get('raisedAt'), 'value', null);
            this.typeEnumId = _.get(form.get('typeEnumId'), 'value', null);
            this.priorityEnumId = _.get(form.get('priorityEnumId'), 'value', null);
            this.probabilityEnumId = _.get(form.get('probabilityEnumId'), 'value', null);
            this.impactEnumId = _.get(form.get('impactEnumId'), 'value', null);
            this.scopeEnumId = _.get(form.get('scopeEnumId'), 'value', null);
            this.initiativeId = _.get(form.get('initiativeId'), 'value', null);
            return;
        }

        this.id = model.id;
        this.description = model.description;
        this.impactDescription = model.impactDescription;
        this.owner = model.owner;
        this.responsePlane = model.responsePlane;
        this.raisedBy = model.raisedBy;
        this.raisedAt = model.raisedAt;
        this.initiativeId = model.initiativeId;
    }

    public setInitiativeId(id: string): RiskCommand {
        this.initiativeId = id;
        return this;
    }
}