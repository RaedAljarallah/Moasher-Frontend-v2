import {format, getQuarter, getYear, addHours } from 'date-fns';

export class DateUtility {
    static getDate(date?: Date | null): string {
        return format(date ? date : new Date(), 'yyyy-MM-dd');
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

    static getQuarterMonths(quarter: number): number[] {
        const quarterFirstMonth = ((quarter - 1) * 3) + 1;
        return [quarterFirstMonth, quarterFirstMonth + 1, quarterFirstMonth + 2];
    }

    static getYearsRange(startDate: Date, endDate: Date): number[] {
        let startYear = getYear(startDate);
        let endYear = getYear(endDate);
        let range: number[] = [];
        for (let i = startYear; i <= endYear; i++) {
            range.push(i);
        }
        return range;
    }

    static toUTCNow(date: Date | null): Date | null {
        if (date) {
            return addHours(date, 3);
        }

        return null;
    }
}
