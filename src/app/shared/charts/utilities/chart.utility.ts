import {DateUtility} from "../../../core/utilities/date.utility";
import {IFinancialPlanningChart} from "../models/financial-planning-chart.model";
import * as _ from "lodash";
import {IOvertimeDatasetSeries} from "../models/overtime-chart.model";
import {MonthUtility} from "../../../core/utilities/month.utility";
import {IInitiativeProgress} from "../../../pages/initiatives/core/models/initiative-progress.model";
import {IProgressChart} from "../models/progress-chart.model";
import {IProgressOvertimeChart} from "../models/progress-overtime-chart.model";

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
    
    static generateFinancialPlanningChart(values: any[], type: 'expenditures' | 'contracts'): IFinancialPlanningChart[] {
        let years = _.uniq(values.map(e => e.year));
        let financialPlanningChart: IFinancialPlanningChart[] = [];

        years.forEach(year => {
            let baselineSeries: IOvertimeDatasetSeries[] = [];
            let plannedSeries: IOvertimeDatasetSeries[] = [];
            let actualSeries: IOvertimeDatasetSeries[] = [];
            let yearValues = values.filter(e => e.year == year);
            yearValues.forEach(e => {
                baselineSeries.push({
                    name: `${MonthUtility.parse(e.month.toString())}`,
                    value: e.initialPlannedAmount,
                    label: e.initialPlannedAmount.toString()
                });
                plannedSeries.push({
                    name: `${MonthUtility.parse(e.month.toString())}`,
                    value: e.plannedAmount,
                    label: e.plannedAmount.toString()
                });
                actualSeries.push({
                    name: `${MonthUtility.parse(e.month.toString())}`,
                    value: e.actualAmount ?? 0,
                    label: (e.actualAmount ?? 0).toString()
                })
            });

            financialPlanningChart.push({
                year: year,
                budget: type === 'expenditures' ? yearValues[0].budget ?? 0 : yearValues[0].approvedCost ?? 0,
                baselineSeries: { name: 'المخطط الأصلي', series: baselineSeries},
                plannedSeries: { name: 'المخطط المحدث', series: plannedSeries},
                actualSeries: { name: type === 'expenditures' ? 'المنصرف الفعلي' : 'الإرتباط الفعلي', series: actualSeries}
            })
        });

        return financialPlanningChart;
    }
    
    static generateProgressOvertimeChart(progress: IInitiativeProgress[]): IProgressOvertimeChart[] {
        let years = _.uniq(progress.map(p => p.year));
        let progressOvertimeChart: IProgressOvertimeChart[] = [];
        
        years.forEach(year => {
            let plannedSeries: IOvertimeDatasetSeries[] = [];
            let actualSeries: IOvertimeDatasetSeries[] = [];
            let yearProgress = progress.filter(p => p.year == year);
            yearProgress.forEach(p => {
                plannedSeries.push({
                    name: `${MonthUtility.parse(p.month.toString())}`,
                    value: p.plannedProgressCumulative,
                    label: p.plannedProgressCumulative.toString()
                });
                actualSeries.push({
                    name: `${MonthUtility.parse(p.month.toString())}`,
                    value: p.actualProgressCumulative,
                    label: p.actualProgressCumulative.toString()
                });
            });
            
            progressOvertimeChart.push({
                year: year,
                plannedSeries: { name: 'الإنجاز المخطط', series: plannedSeries },
                actualSeries: { name: 'الإنجاز الفعلي', series: actualSeries }
            })
        })
        
        return progressOvertimeChart;
    }
}