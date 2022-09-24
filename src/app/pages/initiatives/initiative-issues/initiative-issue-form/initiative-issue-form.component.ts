import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IIssue} from "../../core/models/issue/issue.model";
import {IssueCommand} from "../../core/models/issue/issue.command";
import {ApiService} from "../../../../core/services/api.service";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IEnumType} from "../../../settings/enum-type/core/models/enum-type.model";
import {EnumTypeCategory} from "../../../../core/models/data-types/eum-type-category.data-type";

@Component({
    selector: 'app-initiative-issue-form',
    templateUrl: './initiative-issue-form.component.html',
    styles: []
})
export class InitiativeIssueFormComponent extends FormBase<IIssue, IssueCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'issues';

    protected initCommand(): void {
        this.command = new IssueCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId);
        this.command.id = this.inputCommand.id;
    }

    public description!: FormControl;
    public impactDescription!: FormControl;
    public source!: FormControl;
    public reason!: FormControl;
    public resolution!: FormControl;
    public estimatedResolutionDate!: FormControl;
    public raisedAt!: FormControl;
    public raisedBy!: FormControl;
    public closedAt!: FormControl;
    public scopeEnumId!: FormControl;
    public statusEnumId!: FormControl;
    public impactEnumId!: FormControl;

    public scopeUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeIssueScope}`;
    public impactUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeIssueImpact}`;
    public statusUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeIssueStatus}`;
    
    public currentScope: IEnumType[] = [];
    public currentImpact: IEnumType[] = [];
    public currentStatus: IEnumType[] = [];
    
    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        
        if (this.formAction === FormAction.Update) {
            this.currentScope.push(this.inputCommand.scope);
            this.currentImpact.push(this.inputCommand.impact);
            this.currentStatus.push(this.inputCommand.status);
        }
        
        if (!this.isDeleteRequest) {
            this.description = new FormControl(this.inputCommand.description, [
                Validators.required, Validators.maxLength(500)
            ]);
            this.impactDescription = new FormControl(this.inputCommand.impactDescription, [
                Validators.required, Validators.maxLength(500)
            ]);
            this.source = new FormControl(this.inputCommand.source, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.reason = new FormControl(this.inputCommand.reason, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.resolution = new FormControl(this.inputCommand.resolution, [
                Validators.required, Validators.maxLength(500)
            ]);
            this.estimatedResolutionDate = new FormControl(this.getDate(this.inputCommand.estimatedResolutionDate), [
                Validators.required
            ]);
            this.raisedAt = new FormControl(this.getDate(this.inputCommand.raisedAt), [
                Validators.required
            ]);
            this.raisedBy = new FormControl(this.inputCommand.raisedBy, [
                Validators.required
            ]);
            this.closedAt = new FormControl(this.getDate(this.inputCommand.closedAt));
            this.scopeEnumId = new FormControl(this.inputCommand.scopeEnumId, [
                Validators.required
            ]);
            this.statusEnumId = new FormControl(this.inputCommand.statusEnumId, [
                Validators.required
            ]);
            this.impactEnumId = new FormControl(this.inputCommand.impactEnumId, [
                Validators.required
            ]);
            this.form = new FormGroup({
                description: this.description,
                impactDescription: this.impactDescription,
                source: this.source,
                reason: this.reason,
                resolution: this.resolution,
                estimatedResolutionDate: this.estimatedResolutionDate,
                raisedAt: this.raisedAt,
                raisedBy: this.raisedBy,
                closedAt: this.closedAt,
                scopeEnumId: this.scopeEnumId,
                statusEnumId: this.statusEnumId,
                impactEnumId: this.impactEnumId,
            })
        }
    }
}
