import {DateUtility} from "../../../core/utilities/date.utility";
import {IFinancialPlanningChart} from "../models/financial-planning-chart.model";
import * as _ from "lodash";
import {IOvertimeDatasetSeries} from "../models/overtime-chart.model";
import {MonthUtility} from "../../../core/utilities/month.utility";
import {IInitiativeProgress} from "../../../pages/initiatives/core/models/initiative-progress.model";
import {IProgressChart} from "../models/progress-chart.model";
import {IProgressOvertimeChart} from "../models/progress-overtime-chart.model";
import {IEnumValue} from "../../../core/models/enum-value.model";
import {IStatusSummaryChart} from "../models/status-summary-chart.model";
import {EnumValueUtility} from "../../../core/utilities/enum-value.utility";

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
                    value: type === 'expenditures' ? e.initialPlannedAmount : e.initialPlannedAmountCumulative,
                    label: type === 'expenditures' ? e.initialPlannedAmount.toString() : e.initialPlannedAmountCumulative.toString()
                });
                plannedSeries.push({
                    name: `${MonthUtility.parse(e.month.toString())}`,
                    value: type === 'expenditures' ? e.plannedAmount : e.plannedAmountCumulative,
                    label: type === 'expenditures' ? e.plannedAmount.toString() : e.plannedAmountCumulative.toString()
                });
                actualSeries.push({
                    name: `${MonthUtility.parse(e.month.toString())}`,
                    value: type === 'expenditures' ? (e.actualAmount ?? 0) : e.actualAmountCumulative,
                    label: type === 'expenditures' ? (e.actualAmount ?? 0).toString() : e.actualAmountCumulative
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
                    label: p.status?.name ?? 'لا توجد حالة'
                });
                actualSeries.push({
                    name: `${MonthUtility.parse(p.month.toString())}`,
                    value: p.actualProgressCumulative,
                    label: p.status?.name ?? 'لا توجد حالة'
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
    
    static generateStatusSummaryChart(data: IEnumValue[]): IStatusSummaryChart {
        let enumValues: IEnumValue[] = [];
        let result: IStatusSummaryChart = {values: [], schemes: []};
        data.forEach(data => {
            if (!data.name) {
                enumValues.push({
                    name: 'لا توجد حالة',
                    style: 'no-color'
                });
            } else {
                enumValues.push({ name: data.name, style: data.style });
            }
        });
        
        let names = _.uniq(enumValues.map(v => v.name));
        names.forEach(name => {
            let status = enumValues.filter(v => v.name === name);
            let count = status.length;
            result.values.push({ name: name!, value: count});
            result.schemes.push(EnumValueUtility.toHex(status[0].style!));
        });
        
        return result;
    }
    
}