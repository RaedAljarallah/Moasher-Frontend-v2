import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IDeliverable} from "../../core/models/deliverable/deliverable.model";
import {DeliverableCommand} from "../../core/models/deliverable/deliverable.command";
import {ApiService} from "../../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-initiative-deliverable-form',
    templateUrl: './initiative-deliverable-form.component.html',
    styles: []
})
export class InitiativeDeliverableFormComponent extends FormBase<IDeliverable, DeliverableCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'deliverables';

    protected initCommand(): void {
        this.command = new DeliverableCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId);
        this.command.id = this.inputCommand.id;
    }

    public name!: FormControl;
    public plannedFinish!: FormControl;
    public actualFinish!: FormControl;
    public supportingDocument!: FormControl;

    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (!this.isDeleteRequest) {
            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.plannedFinish = new FormControl(this.getDate(this.inputCommand.plannedFinish), [
                Validators.required,
            ]);
            this.actualFinish = new FormControl(this.getDate(this.inputCommand.actualFinish));
            this.form = new FormGroup({
                name: this.name,
                plannedFinish: this.plannedFinish,
                actualFinish: this.actualFinish,
            })
        }
    }
}
