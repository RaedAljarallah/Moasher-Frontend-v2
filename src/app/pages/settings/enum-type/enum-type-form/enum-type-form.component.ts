import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IEnumType} from "../core/models/enum-type.model";
import {EnumTypeCommand} from "../core/models/enum-type.command";
import {ApiService} from "../../../../core/services/api.service";
import {EnumTypeCategory} from "../../../../core/models/data-types/eum-type-category.data-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";
import {enumTypeColors} from "../../../../core/models/data-types/enum-type-color.data-type";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-enum-type-form',
    templateUrl: './enum-type-form.component.html',
    styles: []
})
export class EnumTypeFormComponent extends FormBase<IEnumType, EnumTypeCommand> implements OnInit, OnDestroy {
    @Input() title: string = '';
    @Input() category!: EnumTypeCategory;
    @Input() withMetadata: boolean = false;
    
    constructor(api: ApiService, private cd: ChangeDetectorRef) {
        super(api);
    }
    
    protected _url: string = 'enum-types';
    
    protected initCommand(): void {
        this.command = new EnumTypeCommand(this.form).setCategory(this.category);
        this.command.id = this.inputCommand.id;
        if (!this.withMetadata) {
            this.command.isDefault = false;
        }
    }

    private defaultSubscription?: Subscription;
    
    public enumTypeColors = enumTypeColors;
    
    public style!: FormControl;
    public name!: FormControl;
    public limitFrom!: FormControl;
    public limitTo!: FormControl;
    public isDefault!: FormControl;
    public showMetadataInput: boolean = false;
    public showIsDefault: boolean = false;
    ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (!this.isDeleteRequest) {
            this.showMetadataInput = !this.inputCommand.isDefault && this.withMetadata;
            this.showIsDefault = this.withMetadata;
            this.style = new FormControl(this.inputCommand.style, [
                Validators.required, Validators.maxLength(50)
            ]);

            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);
            
            this.limitFrom = new FormControl(this.inputCommand.limitFrom, [
                Validators.required,
                Validators.min(0),
                Validators.max(100),
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            
            this.limitTo = new FormControl(this.inputCommand.limitTo, [
                Validators.required,
                Validators.min(0),
                Validators.max(100),
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            
            this.isDefault = new FormControl(this.inputCommand.isDefault);
            
            this.form = new FormGroup({
                style: this.style,
                name: this.name,
            })
            
            if (this.withMetadata) {
                this.form.addControl('limitFrom', this.limitFrom);
                this.form.addControl('limitTo', this.limitTo);
                this.form.addControl('isDefault', this.isDefault);
                if (this.formAction === FormAction.Update && this.isDefault.value === true) {
                    this.form.removeControl('limitFrom');
                    this.form.removeControl('limitTo');
                }
                this.defaultSubscription = this.isDefault.valueChanges.subscribe((value: boolean) => {
                    if (value) {
                        this.showMetadataInput = false;
                        this.form.removeControl('limitFrom');
                        this.form.removeControl('limitTo');
                    } else {
                        this.showMetadataInput = true;
                        this.form.addControl('limitFrom', this.limitFrom);
                        this.form.addControl('limitTo', this.limitTo);
                    }
                    this.cd.detectChanges();
                });
            }
            
            
        }
    }

    public ngOnDestroy(): void {
        this.defaultSubscription?.unsubscribe();
    }
}
