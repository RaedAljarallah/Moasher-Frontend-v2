import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IContract} from "../../core/models/contract/contract.model";
import {ContractCommand} from "../../core/models/contract/contract.command";
import {ApiService} from "../../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnumTypeCategory} from "../../../../core/models/data-types/eum-type-category.data-type";
import {IEnumType} from "../../../settings/enum-type/core/models/enum-type.model";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-initiative-contract-form',
    templateUrl: './initiative-contract-form.component.html',
    styles: []
})
export class InitiativeContractFormComponent extends FormBase<IContract, ContractCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'contracts';
    
    protected initCommand(): void {
        this.command = new ContractCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId)
            .setProjectId(this.inputCommand.projectId);
        
        this.command.id = this.inputCommand.id;
    }

    public name!: FormControl;
    public startDate!: FormControl;
    public endDate!: FormControl;
    public amount!: FormControl;
    public refNumber!: FormControl;
    public supplier!: FormControl;
    public calculateAmount!: FormControl;
    public statusEnumId!: FormControl;

    public statusUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeContractStatus}`;
    public currentStatus: IEnumType[] = [];

    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (this.formAction === FormAction.Update) {
            this.currentStatus.push(this.inputCommand.status);
        }
        
        if (!this.isDeleteRequest) {
            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.startDate = new FormControl(this.getDate(this.inputCommand.startDate), [
                Validators.required
            ]);
            this.endDate = new FormControl(this.getDate(this.inputCommand.endDate), [
                Validators.required
            ]);
            this.amount = new FormControl(this.inputCommand.amount, [
                Validators.required,
                Validators.min(0),
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            this.refNumber = new FormControl(this.inputCommand.refNumber, [
                Validators.maxLength(255)
            ]);
            this.supplier = new FormControl(this.inputCommand.supplier, [
                Validators.maxLength(255)
            ]);
            this.calculateAmount = new FormControl(this.inputCommand.calculateAmount);
            this.statusEnumId = new FormControl(this.inputCommand.statusEnumId, [
                Validators.required
            ]);
            
            this.form = new FormGroup({
                name: this.name,
                startDate: this.startDate,
                endDate: this.endDate,
                amount: this.amount,
                refNumber: this.refNumber,
                supplier: this.supplier,
                calculateAmount: this.calculateAmount,
                statusEnumId: this.statusEnumId
            })
        }
    }
}
