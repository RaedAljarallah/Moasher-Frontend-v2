import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../core/abstracts/form-base";
import {IProgram} from "../core/models/program.model";
import {ProgramCommand} from "../core/models/program.command";
import {ApiService} from "../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-program-form',
    templateUrl: './program-form.component.html',
    styles: []
})
export class ProgramFormComponent extends FormBase<IProgram, ProgramCommand> implements OnInit {

    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'programs';

    protected initCommand(): void {
        this.command = new ProgramCommand(this.form);
        this.command.id = this.inputCommand.id;
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
