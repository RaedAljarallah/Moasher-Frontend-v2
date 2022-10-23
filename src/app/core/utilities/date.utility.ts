import {format, getQuarter, getYear, getMonth, addHours, addMonths, monthsToQuarters } from 'date-fns';
import {NumberUtility} from "./number.utility";

export class DateUtility {
    static getDate(date?: Date | null): string {
        return format(date ? date : new Date(), 'yyyy-MM-dd');
    }
    
    static getYear(date: string): number {
        return getYear(new Date(date));
    }
    
    static getMonth(date: string): number {
        return getMonth(new Date(date)) + 1;
    }
    
    static addMonths(date: string, months: number): string {
        const newDate = addMonths(new Date(date), months);
        return DateUtility.getDate(newDate);
    }
    static getCurrentQuarter(): number {
        return getQuarter(new Date());
    }

    static getCurrentYear(): number {
        return new Date().getFullYear();
    }

    static getCurrentMonth(): number {
        return new Date().getMonth();
    }
    
    static getQuartersOfMonths(startMonth: number, endMonth: number): number[] {
        const firstQuarter = DateUtility.getQuarterOfMonth(startMonth);
        const lastQuarter = DateUtility.getQuarterOfMonth(endMonth);
        return NumberUtility.range(firstQuarter, lastQuarter);
    }
    
    static getQuarterMonths(quarter: number): number[] {
        const quarterFirstMonth = ((quarter - 1) * 3) + 1;
        return [quarterFirstMonth, quarterFirstMonth + 1, quarterFirstMonth + 2];
    }

    static getQuarterOfMonth(month: number): number {
        if (month > 12 || month < 1) return 0;
        
        return Math.floor((month + 2) / 3);
    }
    
    static getYearsRange(startDate: Date, endDate: Date): number[] {
        let startYear = getYear(startDate);
        let endYear = getYear(endDate);
        return NumberUtility.range(startYear, endYear);
    }

    static toUTCNow(date: Date | null): Date | null {
        if (date) {
            return addHours(date, 3);
        }

        return null;
    }
}
