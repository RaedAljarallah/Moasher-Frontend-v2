import {Component, Input, OnInit} from '@angular/core';
import {FormBase} from "../../../core/abstracts/form-base";
import {IAnalytic} from "../core/analytic.model";
import {AnalyticCommand} from "../core/analytic.command";
import {ApiService} from "../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-analytic-form',
    templateUrl: './analytic-form.component.html',
    styles: []
})
export class AnalyticFormComponent extends FormBase<IAnalytic, AnalyticCommand> implements OnInit {
    @Input() parentType: "initiative" | "KPI" = 'initiative';
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'analytics';

    protected initCommand(): void {
        this.command = new AnalyticCommand(this.form);
        if (this.parentType === 'initiative') {
            this.command.initiativeId = this.inputCommand.initiativeId;
        } else {
            this.command.kpiId = this.inputCommand.kpiId;
        }
        this.command.id = this.inputCommand.id;
    }
    
    public description!: FormControl;
    public analyzedAt!: FormControl;
    public analyzedBy!: FormControl;

    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (!this.isDeleteRequest) {
            this.description = new FormControl(this.inputCommand.description, [
                Validators.required, Validators.maxLength(500)
            ]);
            this.analyzedAt = new FormControl(this.getDate(this.inputCommand.analyzedAt), [
                Validators.required
            ]);
            this.analyzedBy = new FormControl(this.inputCommand.analyzedBy, [
                Validators.required, Validators.maxLength(255)
            ]);
            
            this.form = new FormGroup({
                description : this.description,
                analyzedAt: this.analyzedAt,
                analyzedBy: this.analyzedBy
            })
        }
    }
}
