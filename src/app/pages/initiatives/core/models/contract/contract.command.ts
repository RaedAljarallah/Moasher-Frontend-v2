import {IEnumType} from "../../../../settings/enum-type/core/models/enum-type.model";
import {IContract} from "./contract.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {IProject} from "../project/project.model";
import {DateUtility} from "../../../../../core/utilities/date.utility";

export class ContractCommand {
    public id!: string;
    public name!: string;
    public startDate!: Date | null;
    public endDate!: Date | null;
    public amount!: number;
    public refNumber?: string;
    public supplier?: string;
    public calculateAmount: boolean = true;
    public initiativeId!: string;
    public projectId!: string;
    public statusEnumId!: string;
    
    public status!: IEnumType;
    
    constructor(model: IContract | FormGroup | null) {
        if (model === null) {
            return;
        }
        
        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.name = _.get(form.get('name'), 'value', null);
            this.startDate = _.get(form.get('startDate'), 'value', null);
            this.endDate = _.get(form.get('endDate'), 'value', null);
            this.amount = parseFloat(_.get(form.get('amount'), 'value', null));
            this.refNumber = _.get(form.get('refNumber'), 'value', null);
            this.supplier = _.get(form.get('supplier'), 'value', null);
            this.calculateAmount = _.get(form.get('calculateAmount'), 'value', null);
            this.initiativeId = _.get(form.get('initiativeId'), 'value', null);
            this.projectId = _.get(form.get('projectId'), 'value', null);
            this.statusEnumId = _.get(form.get('statusEnumId'), 'value', null);
            return;
        }
        
        this.id = model.id;
        this.name = model.name;
        this.startDate = model.startDate;
        this.endDate = model.endDate;
        this.amount = model.amount;
        this.refNumber = model.refNumber;
        this.supplier = model.supplier;
        this.initiativeId = model.initiativeId;
        this.projectId = model.projectId;
    }

    public castFromProject(project: IProject): ContractCommand {
        this.name = project.name;
        this.startDate = project.plannedContractingDate;
        
        this.endDate = new Date(DateUtility.addMonths(project.plannedContractingDate.toString(), project.duration));
        this.amount = project.estimatedAmount;
        this.initiativeId = project.initiativeId;
        this.projectId = project.id;
        
        return this;
    }
    
    public setInitiativeId(id: string): ContractCommand {
        this.initiativeId = id;
        return this;
    }
    
    public setProjectId(id: string): ContractCommand {
        this.projectId = id;
        return this;
    }
}