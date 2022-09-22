import {IApprovedCost} from "../approved-cost/approved-cost.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class BudgetCommand {
    public id!: string;
    public amount!: number;
    public approvalDate!: Date | null;
    public initiativeId!: string;
    public supportingDocument?: string;

    constructor(model: IApprovedCost | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.approvalDate = _.get(form.get('approvalDate'), 'value', null);
            this.amount = parseFloat(_.get(form.get('amount'), 'value', null));
            this.initiativeId = _.get(form.get('initiativeId'), 'value', null);
            this.supportingDocument = _.get(form.get('supportingDocument'), 'value', null);
            return;
        }

        this.id = model.id;
        this.amount = model.amount;
        this.approvalDate = model.approvalDate;
        this.initiativeId = model.initiativeId;
        this.supportingDocument = model.supportingDocument;
    }

    public setInitiativeId(id: string): BudgetCommand {
        this.initiativeId = id;
        return this;
    }
}