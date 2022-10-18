export class MonthUtility {
    static parse(month: string): number {
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