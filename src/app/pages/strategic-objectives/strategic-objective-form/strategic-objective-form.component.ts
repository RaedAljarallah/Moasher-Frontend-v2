import {Component, Input, OnInit} from '@angular/core';
import {FormBase} from "../../../core/abstracts/form-base";
import {IStrategicObjectiveBase} from "../core/models/strategic-objective-base.model";
import {StrategicObjectiveCommand} from "../core/models/strategic-objective.command";
import {ApiService} from "../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-strategic-objective-form',
    templateUrl: './strategic-objective-form.component.html',
    styles: []
})
export class StrategicObjectiveFormComponent extends FormBase<IStrategicObjectiveBase, StrategicObjectiveCommand> implements OnInit {
    @Input() level: number = 1;
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'strategic-objectives';

    protected initCommand(): void {
        this.command = new StrategicObjectiveCommand(this.form)
            .mapToLevel(this.level, this.inputCommand.id);
    }

    public code!: FormControl;
    public name!: FormControl;
    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (!this.isDeleteRequest) {
            this.code = new FormControl(this.inputCommand.code, [
                Validators.required, Validators.maxLength(50)
            ]);

            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);

            this.form = new FormGroup({
                code: this.code,
                name: this.name
            })
        }
    }
}
