import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IProject} from "../../core/models/project/project.model";
import {ProjectCommand} from "../../core/models/project/project.command";
import {ApiService} from "../../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnumTypeCategory} from "../../../../core/models/data-types/eum-type-category.data-type";
import {IEnumType} from "../../../settings/enum-type/core/models/enum-type.model";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-initiative-project-form',
    templateUrl: './initiative-project-form.component.html',
    styles: []
})
export class InitiativeProjectFormComponent extends FormBase<IProject, ProjectCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'projects';

    protected initCommand(): void {
        this.command = new ProjectCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId);
        this.command.id = this.inputCommand.id;
    }

    public name!: FormControl;
    public plannedBiddingDate!: FormControl;
    public actualBiddingDate!: FormControl;
    public plannedContractingDate!: FormControl;
    public estimatedAmount!: FormControl;
    public phaseEnumId!: FormControl;
    public duration!: FormControl;
    
    public phaseUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeProjectPhase}`;
    public currentPhase: IEnumType[] = [];

    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (this.formAction === FormAction.Update) {
            this.currentPhase.push(this.inputCommand.phase);
        }

        if (!this.isDeleteRequest) {
            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.plannedBiddingDate = new FormControl(this.getDate(this.inputCommand.plannedBiddingDate), [
                Validators.required
            ]);
            this.actualBiddingDate = new FormControl(this.getDate(this.inputCommand.actualBiddingDate));
            this.plannedContractingDate = new FormControl(this.getDate(this.inputCommand.plannedContractingDate), [
                Validators.required
            ]);
            this.estimatedAmount = new FormControl(this.inputCommand.estimatedAmount, [
                Validators.required,
                Validators.min(0),
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            this.duration = new FormControl(this.inputCommand.duration, [
                Validators.required, 
                Validators.min(0),
                Validators.pattern("^[0-9]*$")
            ])
            this.phaseEnumId = new FormControl(this.inputCommand.phaseEnumId, [
                Validators.required
            ]);
            
            this.form = new FormGroup({
                name: this.name,
                plannedBiddingDate: this.plannedBiddingDate,
                actualBiddingDate: this.actualBiddingDate,
                plannedContractingDate: this.plannedContractingDate,
                estimatedAmount: this.estimatedAmount,
                duration: this.duration,
                phaseEnumId: this.phaseEnumId
            })
        }
    }
}
