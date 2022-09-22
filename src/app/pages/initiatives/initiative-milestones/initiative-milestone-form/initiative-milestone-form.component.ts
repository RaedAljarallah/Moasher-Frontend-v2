import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IMilestone} from "../../core/models/milestone/milestone.model";
import {MilestoneCommand} from "../../core/models/milestone/milestone.command";
import {ApiService} from "../../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-initiative-milestone-form',
    templateUrl: './initiative-milestone-form.component.html',
    styles: []
})
export class InitiativeMilestoneFormComponent extends FormBase<IMilestone, MilestoneCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'milestones';

    protected initCommand(): void {
        this.command = new MilestoneCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId);
        this.command.id = this.inputCommand.id;
    }
    
    public name!: FormControl;
    public plannedFinish!: FormControl;
    public actualFinish!: FormControl;
    public weight!: FormControl;
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
            this.weight = new FormControl(this.inputCommand.weight, [
                Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            
            this.form = new FormGroup({
                name: this.name,
                plannedFinish: this.plannedFinish,
                actualFinish: this.actualFinish,
                weight: this.weight
            })
        }
    }
    
}
