import {Component, Input, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IEnumType} from "../core/models/enum-type.model";
import {EnumTypeCommand} from "../core/models/enum-type.command";
import {ApiService} from "../../../../core/services/api.service";
import {EnumTypeCategory} from "../../../../core/models/data-types/eum-type-category.data-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";
import {enumTypeColors} from "../../../../core/models/data-types/enum-type-color.data-type";

@Component({
    selector: 'app-enum-type-form',
    templateUrl: './enum-type-form.component.html',
    styles: []
})
export class EnumTypeFormComponent extends FormBase<IEnumType, EnumTypeCommand> implements OnInit {
    @Input() title: string = '';
    @Input() category!: EnumTypeCategory;
    @Input() withMetadata: boolean = false;
    
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'enum-types';
    
    protected initCommand(): void {
        this.command = new EnumTypeCommand(this.form).setCategory(this.category);
        this.command.id = this.inputCommand.id;
        if (this.withMetadata) {
            this.command.setMetadata(this.form, 'diff')
        }
    }
    
    public enumTypeColors = enumTypeColors;
    
    public style!: FormControl;
    public name!: FormControl;
    public metadata!: FormControl;
    
    ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (!this.isDeleteRequest) {
            this.style = new FormControl(this.inputCommand.style, [
                Validators.required, Validators.maxLength(50)
            ]);

            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);

            this.metadata = new FormControl(this.inputCommand.metadata?.['diff'], [
                Validators.required,
                Validators.min(0.1),
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            
            this.form = new FormGroup({
                style: this.style,
                name: this.name
            })
            
            if (this.withMetadata) {
                this.form.addControl('metadata', this.metadata);
            }
        }
    }

}
