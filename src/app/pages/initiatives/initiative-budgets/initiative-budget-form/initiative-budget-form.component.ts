import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IBudget} from "../../core/models/budget/budget.model";
import {BudgetCommand} from "../../core/models/budget/budget.command";
import {ApiService} from "../../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-initiative-budget-form',
    templateUrl: './initiative-budget-form.component.html',
    styles: []
})
export class InitiativeBudgetFormComponent extends FormBase<IBudget, BudgetCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'budgets';

    protected initCommand(): void {
        this.command = new BudgetCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId);
        this.command.id = this.inputCommand.id;
    }

    public approvalDate!: FormControl;
    public amount!: FormControl;
    public supportingDocument!: FormControl;

    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (!this.isDeleteRequest) {
            this.approvalDate = new FormControl(this.getDate(this.inputCommand.approvalDate), [
                Validators.required,
            ]);
            this.amount = new FormControl(this.inputCommand.amount, [
                Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);

            this.form = new FormGroup({
                approvalDate: this.approvalDate,
                amount: this.amount,
            })
        }
    }
}
