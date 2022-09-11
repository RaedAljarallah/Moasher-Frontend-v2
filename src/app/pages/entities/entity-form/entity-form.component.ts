import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EntityCommand} from "../core/models/entity.command";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {IEntity} from "../core/models/entity.model";
import {FormBase} from "../../../core/abstracts/form-base";
import {ApiService} from "../../../core/services/api.service";

@Component({
    selector: 'app-entity-form',
    templateUrl: './entity-form.component.html',
    styles: []
})
export class EntityFormComponent extends FormBase<IEntity, EntityCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }
    
    protected _url: string = 'entities';

    protected initCommand(): void {
        this.command = new EntityCommand(this.form);
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

