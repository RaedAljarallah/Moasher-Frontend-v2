import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {RiskCommand} from "../../core/models/risk/risk.command";
import {IRisk} from "../../core/models/risk/risk.model";
import {ApiService} from "../../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IEnumType} from "../../../settings/enum-type/core/models/enum-type.model";
import {EnumTypeCategory} from "../../../../core/models/data-types/eum-type-category.data-type";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-initiative-risk-form',
    templateUrl: './initiative-risk-form.component.html',
    styles: []
})
export class InitiativeRiskFormComponent extends FormBase<IRisk, RiskCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'risks';

    protected initCommand(): void {
        this.command = new RiskCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId);
        this.command.id = this.inputCommand.id;
    }

    public description!: FormControl;
    public impactDescription!: FormControl;
    public owner!: FormControl;
    public responsePlane!: FormControl;
    public raisedBy!: FormControl;
    public raisedAt!: FormControl;
    public typeEnumId!: FormControl;
    public priorityEnumId!: FormControl;
    public probabilityEnumId!: FormControl;
    public impactEnumId!: FormControl;
    public scopeEnumId!: FormControl;

    public typeUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeRiskType}`;
    public priorityUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeRiskPriority}`;
    public probabilityUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeRiskProbability}`;
    public impactUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeRiskImpact}`;
    public scopeUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeRiskScope}`;
    
    public currentType: IEnumType[] = [];
    public currentPriority: IEnumType[] = [];
    public currentProbability: IEnumType[] = [];
    public currentImpact: IEnumType[] = [];
    public currentScope: IEnumType[] = [];

    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        
        if (this.formAction === FormAction.Update) {
            this.currentType.push(this.inputCommand.type);
            this.currentPriority.push(this.inputCommand.priority);
            this.currentProbability.push(this.inputCommand.probability);
            this.currentImpact.push(this.inputCommand.impact);
            this.currentScope.push(this.inputCommand.scope);
        }
        
        if (!this.isDeleteRequest) {
            this.description = new FormControl(this.inputCommand.description, [
                Validators.required, Validators.maxLength(500)
            ]);
            this.impactDescription = new FormControl(this.inputCommand.impactDescription, [
                Validators.required, Validators.maxLength(500)
            ]);
            this.owner = new FormControl(this.inputCommand.owner, [
                Validators.maxLength(255)
            ]);
            this.responsePlane = new FormControl(this.inputCommand.responsePlane, [
                Validators.required, Validators.maxLength(500)
            ]);
            this.raisedBy = new FormControl(this.inputCommand.raisedBy, [
                Validators.required
            ]);
            this.raisedAt = new FormControl(this.getDate(this.inputCommand.raisedAt), [
                Validators.required
            ]);
            this.typeEnumId = new FormControl(this.inputCommand.typeEnumId, [
                Validators.required
            ]);
            this.priorityEnumId = new FormControl(this.inputCommand.priorityEnumId, [
                
            ]);
            this.probabilityEnumId = new FormControl(this.inputCommand.probabilityEnumId, [
                Validators.required
            ]);
            this.impactEnumId = new FormControl(this.inputCommand.impactEnumId, [
                Validators.required
            ]);
            this.scopeEnumId = new FormControl(this.inputCommand.scopeEnumId, [
                Validators.required
            ]);
            
            this.form = new FormGroup({
                
                description: this.description,
                impactDescription: this.impactDescription,
                owner: this.owner,
                responsePlane: this.responsePlane,
                raisedBy: this.raisedBy,
                raisedAt: this.raisedAt,
                typeEnumId: this.typeEnumId,
                priorityEnumId: this.priorityEnumId,
                probabilityEnumId: this.probabilityEnumId,
                impactEnumId: this.impactEnumId,
                scopeEnumId: this.scopeEnumId,
            })
        }
    }
}
