import {IExpenditure} from "./expenditure.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class ExpenditureCommand {
    public id!: string;
    public projectId?: string;
    public contractId?: string;
    public year!: number;
    public month!: number;
    public plannedAmount!: number;
    public actualAmount?: number;
    
    constructor(model: IExpenditure | FormGroup | null) {
        if (model === null) {
            return;
        }
        
        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.year = parseInt(_.get(form.get('year'), 'value', null));
            this.month = parseInt(_.get(form.get('month'), 'value', null));
            this.plannedAmount = parseFloat(_.get(form.get('plannedAmount'), 'value', null));
            this.actualAmount = parseFloat(_.get(form.get('actualAmount'), 'value', null));
            this.projectId = _.get(form.get('projectId'), 'value', null);
            this.contractId = _.get(form.get('contractId'), 'value', null);
            return;
        }
        
        this.id = model.id;
        this.projectId = model.projectId;
        this.contractId = model.contractId;
        this.year = model.year;
        this.month = model.month;
        this.plannedAmount = model.plannedAmount;
        this.actualAmount = model.actualAmount;
    }
}