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
import {debounceTime} from "rxjs/operators";
import {DateUtility} from "../../../../core/utilities/date.utility";
import {NumberUtility} from "../../../../core/utilities/number.utility";
import {ExpenditureCommand} from "../../core/models/expenditure/expenditure.command";
import * as _ from 'lodash';

@Component({
    selector: 'app-initiative-project-form',
    templateUrl: './initiative-project-form.component.html',
    styles: []
})
export class InitiativeProjectFormComponent extends FormBase<IProject, ProjectCommand> implements OnInit, OnDestroy {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'projects';

    protected initCommand(): void {
        this.command = new ProjectCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId);
        this.command.id = this.inputCommand.id;
        
        this.command.setExpenditurePlan(this.expenditurePlan);
    }

    private durationSubscription?: Subscription;
    private plannedContractingDateSubscription?: Subscription;
    public name!: FormControl;
    public plannedBiddingDate!: FormControl;
    public actualBiddingDate!: FormControl;
    public plannedContractingDate!: FormControl;
    public estimatedAmount!: FormControl;
    public phaseEnumId!: FormControl;
    public duration!: FormControl;

    public phaseUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeProjectPhase}`;
    public currentPhase: IEnumType[] = [];

    public expenditureTimeline: { year: number, months: number[] }[] = [];
    public totalPlannedExpenditure: number = 0;
    public showExpenditurePlanError: boolean = false;
    public expenditurePlanErrorMessage: string = '';
    
    private expenditurePlan: { year: number, expenditures: { month: number, amount: number }[] }[] = [];

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
            ]);
            this.phaseEnumId = new FormControl(this.inputCommand.phaseEnumId, [
                Validators.required
            ]);
            
            if (this.formAction === FormAction.Update) {
                this.generateExpenditureTimeline(this.inputCommand.duration);
                this.parseToExpenditurePlan(this.inputCommand.expenditures);
            }
            
            this.form = new FormGroup({
                name: this.name,
                plannedBiddingDate: this.plannedBiddingDate,
                actualBiddingDate: this.actualBiddingDate,
                plannedContractingDate: this.plannedContractingDate,
                estimatedAmount: this.estimatedAmount,
                duration: this.duration,
                phaseEnumId: this.phaseEnumId
            });

            if (this.formAction === FormAction.Create) {
                this.duration.disable();
            }

            this.plannedContractingDateSubscription = this.plannedContractingDate.valueChanges.subscribe(value => {
                if (value) {
                    this.duration.enable();
                } else {
                    this.duration.disable();
                }
            });

            this.durationSubscription = this.duration.valueChanges.pipe(debounceTime(500)).subscribe(value => {
                const duration = +value;
                if (!isNaN(duration) && duration > 0 && this.plannedContractingDate.value) {
                    this.generateExpenditureTimeline(duration);
                }
            });
        }
    }

    public addExpenditure(e: Event, year: number, month: number): void {
        const value = +(e.target as HTMLInputElement).value;
        if (isNaN(value)) {
            return;
        }
        const plan = this.expenditurePlan.find(p => p.year === year);
        if (plan) {
            const expenditure = plan.expenditures.find(e => e.month === month);
            if (expenditure) {
                expenditure.amount = value;
            } else {
                plan.expenditures.push({month: month, amount: value});
            }
        } else {
            this.expenditurePlan.push({year: year, expenditures: [{month: month, amount: value}]});
        }
        
        this.calculateTotalPlannedExpenditure();
    }
    
    public getExpenditure(year: number, month: number): number | null {
        const yearExpenditure = this.expenditurePlan.find(e => e.year === year);
        if (yearExpenditure) {
            return yearExpenditure.expenditures.find(e => e.month === month)?.amount ?? null
        }
        
        return null;
    }
    
    public override beforeSubmitValidation(): boolean {
        const remaining = this.estimatedAmount.value - this.totalPlannedExpenditure;
        
        if (remaining === 0) {
            this.showExpenditurePlanError = false;
            this.expenditurePlanErrorMessage = '';
            return true;
        }
        
        if (remaining < 0) {
            this.expenditurePlanErrorMessage = 'التكاليف الموزعة للخطة أعلى من القيمة التقديرية';
        }
        
        if (remaining > 0) {
            this.expenditurePlanErrorMessage = 'التكاليف الموزعة للخطة أقل من القيمة التقديرية';
        }
        
        this.showExpenditurePlanError = true;
        return false;
    }
    
    public override handelError(errors: { [p: string]: string[] }) {
        if (errors['expenditures']) {
            this.expenditurePlanErrorMessage = errors['expenditures'][0];
            this.showExpenditurePlanError = true;
        }
    }

    private calculateTotalPlannedExpenditure(): void {
        let totalExpenditure = 0
        this.expenditurePlan.forEach(plan => {
            plan.expenditures.forEach(expenditure => {
                totalExpenditure += expenditure.amount;
            });
        });

        this.totalPlannedExpenditure = totalExpenditure;
    }
    
    private generateExpenditureTimeline(duration: number): void {
        const newDate = DateUtility.addMonths(this.plannedContractingDate.value, duration);
        const yearsRange = DateUtility.getYearsRange(new Date(this.plannedContractingDate.value), new Date(newDate));
        const startMonth = DateUtility.getMonth(this.plannedContractingDate.value);
        const lastMonth = DateUtility.getMonth(newDate);
        this.expenditureTimeline = [];
        yearsRange.forEach((year: number, index: number) => {
            let startRange = 1;
            let lastRange = 12;
            if (index === 0) {
                startRange = startMonth;
            }

            if (index === yearsRange.length - 1) {
                lastRange = lastMonth;
            }

            this.expenditureTimeline.push({
                year: year,
                months: NumberUtility.range(startRange, lastRange)
            });
        });
        
        this.updateExpenditurePlan();
    }
    
    private updateExpenditurePlan(): void {
        if (this.expenditurePlan.length === 0) return;

        let newExpenditurePlan: { year: number, expenditures: { month: number, amount: number }[] }[] = [];
        this.expenditureTimeline.forEach(timeline => {
            const originalYearExpenditurePlan = this.expenditurePlan.find(p => p.year === timeline.year);
            if (originalYearExpenditurePlan) {
                newExpenditurePlan.push({ year: timeline.year, expenditures: [] });
                const newYearPlan = newExpenditurePlan.find(p => p.year === timeline.year);
                timeline.months.forEach(timelineMonth => {
                    const originalMonthExpenditurePlan = originalYearExpenditurePlan.expenditures.find(e => e.month === timelineMonth);
                    if (originalMonthExpenditurePlan) {
                        newYearPlan!.expenditures.push({month: timelineMonth, amount: originalMonthExpenditurePlan.amount});
                    }
                })
            }
        });
        
        this.expenditurePlan = newExpenditurePlan;
        
        this.calculateTotalPlannedExpenditure();
    }
    
    private parseToExpenditurePlan(expenditures: ExpenditureCommand[]): void {
        let years = expenditures.map(e => e.year);
        years = _.uniq(years);
        years.forEach(year => {
            const yearExpenditures = expenditures.filter(e => e.year === year);
            this.expenditurePlan.push({
                year: year,
                expenditures: yearExpenditures.map(e => ({ month: this.parseMonth(e.month.toString()), amount: e.plannedAmount }))
            });
        });

        this.calculateTotalPlannedExpenditure();
    }
    
    private parseMonth(month: string): number {
        switch (month.toLowerCase()) {
            case 'one':
                return 1;
            case 'two':
                return 2;
            case 'three':
                return 3;
            case 'four':
                return 4;
            case 'five':
                return 5;
            case 'six':
                return 6;
            case 'seven':
                return 7;
            case 'eight':
                return 8;
            case 'nine':
                return 9;
            case 'ten':
                return 10;
            case 'eleven':
                return 11;
            case 'twelve':
                return 12;
            default:
                return 13;
        }
    }
    public ngOnDestroy(): void {
        this.durationSubscription?.unsubscribe();
        this.plannedContractingDateSubscription?.unsubscribe();
    }

}
