import {DateUtility} from "../../../../core/utilities/date.utility";
import {NumberUtility} from "../../../../core/utilities/number.utility";
import {ExpenditureCommand} from "../models/expenditure/expenditure.command";
import * as _ from "lodash";
import {IExpenditurePlan} from "../models/expenditure/expenditure-plan.model";

export default class ExpenditurePlanService {
    public expenditureTimeline: { year: number, months: number[] }[] = [];
    public totalPlannedExpenditure: number = 0;
    public showExpenditurePlanError: boolean = false;
    public expenditurePlanErrorMessage: string = '';
    private expenditurePlan: IExpenditurePlan[] = [];
    private readonly _type: 'project' | 'contract';
    
    constructor(type: 'project' | 'contract') {
        this._type = type;
    }
    
    public getExpenditurePlan(): IExpenditurePlan[] {
        return this.expenditurePlan;
    }
    
    public addExpenditure(value: number, year: number, month: number, type: 'planned' | 'actual' = 'planned'): void {
        if (isNaN(value)) {
            return;
        }

        const plan = this.expenditurePlan.find(p => p.year === year);
        if (plan) {
            const expenditure = plan.expenditures.find(e => e.month === month);
            if (expenditure) {
                if (type === 'planned') {
                    expenditure.plannedAmount = value;
                } else {
                    expenditure.actualAmount = value;
                }
            } else {
                if (type === 'planned') {
                    plan.expenditures.push({month: month, plannedAmount: value});
                } else {
                    plan.expenditures.push({month: month, plannedAmount: 0, actualAmount: value});
                }
            }
        } else {
            if (type === 'planned') {
                this.expenditurePlan.push({year: year, expenditures: [{month: month, plannedAmount: value}]});
            } else {
                this.expenditurePlan.push({year: year, expenditures: [{month: month, plannedAmount: 0, actualAmount: value}]});
            }
        }

        this.calculateTotalPlannedExpenditure();
    }

    public getExpenditure(year: number, month: number, type: 'planned' | 'actual' = 'planned'): number | null {
        const yearExpenditure = this.expenditurePlan.find(e => e.year === year);
        if (yearExpenditure) {
            if (type === 'planned') {
                return yearExpenditure.expenditures.find(e => e.month === month)?.plannedAmount ?? null
            } else {
                return yearExpenditure.expenditures.find(e => e.month === month)?.actualAmount ?? null
            }
        }

        return null;
    }
    
    public isValid(limitAmount: number): boolean {
        const remaining = limitAmount - this.totalPlannedExpenditure;

        if (remaining === 0) {
            this.showExpenditurePlanError = false;
            this.expenditurePlanErrorMessage = '';
            return true;
        }
        
        const messageSuffix = this._type === 'project'
            ? 'القيمة التقديرية'
            : 'قيمة العقد';
        
        if (remaining < 0) {
            this.expenditurePlanErrorMessage = `التكاليف الموزعة للخطة أعلى من ${messageSuffix}`;
        }

        if (remaining > 0) {
            this.expenditurePlanErrorMessage = `التكاليف الموزعة للخطة أقل من ${messageSuffix}`;
        }

        this.showExpenditurePlanError = true;
        return false;
    }

    public generateExpenditureTimeline(startDate: string, endDate: string): void {
        const yearsRange = DateUtility.getYearsRange(new Date(startDate), new Date(endDate));
        const startMonth = DateUtility.getMonth(startDate);
        const lastMonth = DateUtility.getMonth(endDate);
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

    public parseToExpenditurePlan(expenditures: ExpenditureCommand[]): void {
        let years = expenditures.map(e => e.year);
        years = _.uniq(years);
        years.forEach(year => {
            const yearExpenditures = expenditures.filter(e => e.year === year);
            this.expenditurePlan.push({
                year: year,
                expenditures: yearExpenditures.map(e => ({ 
                    month: this.parseMonth(e.month.toString()), 
                    plannedAmount: e.plannedAmount,
                    actualAmount: e.actualAmount
                }))
            });
        });

        this.calculateTotalPlannedExpenditure();
    }
    
    public setValidationError(error: string): void {
        this.expenditurePlanErrorMessage = error;
        this.showExpenditurePlanError = true;
    }
    
    private calculateTotalPlannedExpenditure(): void {
        let totalExpenditure = 0
        this.expenditurePlan.forEach(plan => {
            plan.expenditures.forEach(expenditure => {
                totalExpenditure += expenditure.plannedAmount;
            });
        });

        this.totalPlannedExpenditure = totalExpenditure;
    }

    private updateExpenditurePlan(): void {
        if (this.expenditurePlan.length === 0) return;

        let newExpenditurePlan: IExpenditurePlan[] = [];
        this.expenditureTimeline.forEach(timeline => {
            const originalYearExpenditurePlan = this.expenditurePlan.find(p => p.year === timeline.year);
            if (originalYearExpenditurePlan) {
                newExpenditurePlan.push({ year: timeline.year, expenditures: [] });
                const newYearPlan = newExpenditurePlan.find(p => p.year === timeline.year);
                timeline.months.forEach(timelineMonth => {
                    const originalMonthExpenditurePlan = originalYearExpenditurePlan.expenditures.find(e => e.month === timelineMonth);
                    if (originalMonthExpenditurePlan) {
                        newYearPlan!.expenditures.push({
                            month: timelineMonth, 
                            plannedAmount: originalMonthExpenditurePlan.plannedAmount,
                            actualAmount: originalMonthExpenditurePlan.actualAmount
                        });
                    }
                })
            }
        });

        this.expenditurePlan = newExpenditurePlan;

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
}