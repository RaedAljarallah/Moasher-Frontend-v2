import {DateUtility} from "../../../core/utilities/date.utility";

export class ChartUtility {
    static getCurrentQuarter(): string {
        let currentYear = DateUtility.getCurrentYear();
        let currentQuarter = DateUtility.getCurrentQuarter();

        return `Q${currentQuarter}-${currentYear}`;
    }
    static getNextQuarter(): string {
        let currentYear = DateUtility.getCurrentYear();
        let nextQuarter = DateUtility.getCurrentQuarter() + 1;

        if (nextQuarter > 4) {
            return `Q1-${currentYear + 1}`;
        }

        return `Q${nextQuarter}-${currentYear}`;
    }
}