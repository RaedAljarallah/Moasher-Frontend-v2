import {IEnumType} from "../../../../settings/enum-type/core/models/enum-type.model";
import {FormGroup} from "@angular/forms";
import {IIssue} from "./issue.model";
import * as _ from "lodash";

export class IssueCommand {
    public id!: string;
    public description!: string;
    public impactDescription!: string;
    public source!: string;
    public reason!: string;
    public resolution!: string;
    public estimatedResolutionDate!: Date | null;
    public raisedAt!: Date | null;
    public raisedBy!: string;
    public closedAt?: Date | null;
    public scopeEnumId!: string;
    public statusEnumId!: string;
    public impactEnumId!: string;
    public initiativeId!: string;

    public scope!: IEnumType;
    public status!: IEnumType;
    public impact!: IEnumType;
    
    constructor(model: IIssue | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.description = _.get(form.get('description'), 'value', null);
            this.impactDescription = _.get(form.get('impactDescription'), 'value', null);
            this.source = _.get(form.get('source'), 'value', null);
            this.reason = _.get(form.get('reason'), 'value', null);
            this.resolution = _.get(form.get('resolution'), 'value', null);
            this.estimatedResolutionDate = _.get(form.get('estimatedResolutionDate'), 'value', null);
            this.raisedAt = _.get(form.get('raisedAt'), 'value', null);
            this.raisedBy = _.get(form.get('raisedBy'), 'value', null);
            this.closedAt = _.get(form.get('closedAt'), 'value', null);
            this.scopeEnumId = _.get(form.get('scopeEnumId'), 'value', null);
            this.statusEnumId = _.get(form.get('statusEnumId'), 'value', null);
            this.impactEnumId = _.get(form.get('impactEnumId'), 'value', null);
            this.initiativeId = _.get(form.get('initiativeId'), 'value', null);
            return;
        }

        this.id = model.id;
        this.description = model.description;
        this.impactDescription = model.impactDescription;
        this.source = model.source;
        this.reason = model.reason;
        this.resolution = model.resolution;
        this.estimatedResolutionDate = model.estimatedResolutionDate;
        this.raisedAt = model.raisedAt;
        this.raisedBy = model.raisedBy;
        this.closedAt = model.closedAt;
        this.initiativeId = model.initiativeId;
    }

    public setInitiativeId(id: string): IssueCommand {
        this.initiativeId = id;
        return this;
    }
}