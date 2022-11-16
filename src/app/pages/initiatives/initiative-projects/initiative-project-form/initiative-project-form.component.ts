import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IProject} from "../../core/models/project/project.model";
import {ProjectCommand} from "../../core/models/project/project.command";
import {ApiService} from "../../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnumTypeCategory} from "../../../../core/models/data-types/eum-type-category.data-type";
import {IEnumType} from "../../../settings/enum-type/core/models/enum-type.model";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";
import {Subscription} from "rxjs";
import ExpenditurePlanService from "../../core/services/expenditure-plan.service";
import {IMilestone} from "../../core/models/milestone/milestone.model";

@Component({
    selector: 'app-initiative-project-form',
    templateUrl: './initiative-project-form.component.html',
    styles: []
})
export class InitiativeProjectFormComponent extends FormBase<IProject, ProjectCommand> implements OnInit, OnDestroy {
    public es: ExpenditurePlanService;
    constructor(api: ApiService) {
        super(api);
        this.es = new ExpenditurePlanService('project');
    }

    protected _url: string = 'projects';

    protected initCommand(): void {
        this.command = new ProjectCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId);
        this.command.id = this.inputCommand.id;
        
        this.command.setExpenditurePlan(this.es.getExpenditurePlan());
        this.command.setMilestones(this.currentMilestones);
    }

    private durationSubscription?: Subscription;
    private plannedContractingDateSubscription?: Subscription;
    public name!: FormControl;
    public plannedBiddingDate!: FormControl;
    public actualBiddingDate!: FormControl;
    public plannedContractingDate!: FormControl;
    public plannedContractEndDate!: FormControl;
    public estimatedAmount!: FormControl;
    public phaseEnumId!: FormControl;
    public milestoneId!: FormControl;
    
    public phaseUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeProjectPhase}`;
    public milestonesUrl: string = "";
    public currentPhase: IEnumType[] = [];
    public currentMilestones: IMilestone[] = [];
    
    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (this.formAction === FormAction.Update) {
            this.currentPhase.push(this.inputCommand.phase);
            this.inputCommand.milestones.forEach(milestone => this.currentMilestones.push(milestone));
        }
        
        if (!this.isDeleteRequest) {
            this.milestonesUrl = `milestones?initiativeId=${this.inputCommand.initiativeId}`;
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
            this.plannedContractEndDate = new FormControl(this.getDate(this.inputCommand.plannedContractEndDate), [
                Validators.required
            ]);
            this.estimatedAmount = new FormControl(this.inputCommand.estimatedAmount, [
                Validators.required,
                Validators.min(0),
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            this.phaseEnumId = new FormControl(this.inputCommand.phaseEnumId, [
                Validators.required
            ]);
            this.milestoneId = new FormControl();
            
            if (this.formAction === FormAction.Update) {
                this.es.generateExpenditureTimeline(this.plannedContractingDate.value, this.plannedContractEndDate.value);
                this.es.parseToExpenditurePlan(this.inputCommand.expenditures);
            }
            
            this.form = new FormGroup({
                name: this.name,
                plannedBiddingDate: this.plannedBiddingDate,
                actualBiddingDate: this.actualBiddingDate,
                plannedContractingDate: this.plannedContractingDate,
                plannedContractEndDate: this.plannedContractEndDate,
                estimatedAmount: this.estimatedAmount,
                phaseEnumId: this.phaseEnumId,
                milestoneId: this.milestoneId
            });

            if (this.formAction === FormAction.Create) {
                this.plannedContractEndDate.disable();
            }

            this.plannedContractingDateSubscription = this.plannedContractingDate.valueChanges.subscribe(value => {
                if (value) {
                    this.plannedContractEndDate.enable();
                } else {
                    this.plannedContractEndDate.disable();
                }
            });

            this.durationSubscription = this.plannedContractEndDate.valueChanges.subscribe(value => {
                if (this.plannedContractingDate.value) {
                    this.es.generateExpenditureTimeline(this.plannedContractingDate.value, this.plannedContractEndDate.value);
                }
            });
        }
    }

    public addExpenditure(e: Event, year: number, month: number): void {
        const value = +(e.target as HTMLInputElement).value;
        this.es.addExpenditure(value, year, month);
    }

    public addMilestone(milestone: IMilestone): void{
        if (milestone) {
            const exists = this.currentMilestones.find(m => m.id === milestone.id);
            if (exists) return;
            this.currentMilestones.push(milestone);
        }
    }
    
    public removeMilestone(milestone: IMilestone): void {
        if (milestone) {
            const index = this.currentMilestones.findIndex((m: IMilestone) => m.id === milestone.id);
            if (index > -1) {
                this.currentMilestones.splice(index, 1);
            }
        }
    }
    
    public override beforeSubmitValidation(): boolean {
        if (this.formAction === FormAction.Delete) {
            return true;
        }
        
        return this.es.isValid(this.estimatedAmount.value);
    }
    
    public override handelError(errors: { [p: string]: string[] }) {
        if (errors['expenditures']) {
            this.es.setValidationError(errors['expenditures'][0]);
        }
    }
    
    public ngOnDestroy(): void {
        this.durationSubscription?.unsubscribe();
        this.plannedContractingDateSubscription?.unsubscribe();
    }
}
