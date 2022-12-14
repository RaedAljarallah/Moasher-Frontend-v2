import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {IFinancialPlanningChart} from "../models/financial-planning-chart.model";
import {Color} from "@swimlane/ngx-charts";
import {financialPlanColorScheme} from "../color-schemes";
import * as c3 from "c3";
import * as d3 from "d3";
import {IOvertimeDatasetSeries} from "../models/overtime-chart.model";
import {DateUtility} from "../../../core/utilities/date.utility";

@Component({
    selector: 'app-expenditure-progress-chart',
    templateUrl: './expenditure-progress-chart.component.html',
    styles: []
})
export class ExpenditureProgressChartComponent implements OnInit, AfterViewInit {
    @Input() data: IFinancialPlanningChart[] | null = [];
    @Input() title: string = '';
    @Input() thresholdName: string = '';
    @ViewChildren('financialPlanningChart') chartElm?: QueryList<ElementRef>;

    private chart: any;
    private chartElement: any;
    private maxYLevel: number = 0;

    public scheme: Color = financialPlanColorScheme;
    public selectedYear: number = 0;
    public years: number[] = [];
    public granularity: 'M' | 'Q' = 'Q';
    public xSeries: string[] = [];
    
    constructor(private cd: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
    }

    public onYearSelected(year: number): void {
        this.selectedYear = year;
        this.generateChart();
    }

    public onGranularityChanged(granularity: 'M' | 'Q'): void {
        this.granularity = granularity;
        this.generateChart();
    }
    
    public ngAfterViewInit(): void {
        this.chartElm?.changes.subscribe((elm) => {
            if (!this.data) return;
            this.years = this.data.map(v => v.year).sort();
            this.selectedYear = this.years[this.years.length - 1];
            this.chartElement = elm.toArray()[0].nativeElement;
            this.generateChart();
            this.cd.detectChanges();
        });
    }

    private generateChart(): void {
        if (!this.data) return;
        if (this.data.length === 0) return;
        if (!this.selectedYear) return;

        const dataset = this.getDataset();
        if(!dataset) return;

        this.chart = c3.generate({
            bindto: this.chartElement,
            data: {
                columns: [
                    ['actual', 0],
                    ['plan', 0],
                    ['baseline', 0],

                ],
                colors: {
                    actual: this.scheme.domain[2],
                    plan: this.scheme.domain[0],
                    baseline: this.scheme.domain[1]
                },
                axes: {
                    actual: 'y',
                },
                types: {
                    actual: 'bar',
                    plan: 'bar'
                },

                names: {
                    actual: dataset!.actualSeries.name,
                    plan: dataset!.plannedSeries.name,
                    baseline: dataset!.baselineSeries.name
                },
                labels: {
                    format: (_v: number | { valueOf(): number }, id: string, i: number) => {
                        if (!isNaN(i)) {
                            if (id === 'baseline') {
                                return this.getLabel(dataset!.baselineSeries.series[i].value);
                            }

                            if (id === 'plan') {
                                return this.getLabel(dataset!.plannedSeries.series[i].value);
                            }

                            if (id === 'actual') {
                                return this.getLabel(dataset!.actualSeries.series[i].value);
                            }
                        }
                        return '';
                    }
                }
            },

            legend: {
                show: true,
                hide: 'budget'
            },
            tooltip: {
                format: {
                    value: (value: number) => value.toLocaleString(),
                    title: () => ''
                }
            },
            axis: {
                y: {
                    show: false,
                    max: this.maxYLevel
                },
                x: {
                    type: 'category',
                    categories: this.xSeries
                }
            },
            onrendered: () => {
                const actualBarHeight = d3.select(this.chartElement).selectAll('.c3-chart-bars .c3-bars-actual .c3-bar').nodes().map((el: any) => el.getBBox().height);
                d3.select(this.chartElement).selectAll('.c3-texts-actual text').nodes().forEach((el: any, i: number) => {
                    d3.select(el).attr('transform', `translate(0, ${actualBarHeight[i]})`)
                })

                const planBarHeight = d3.select(this.chartElement).selectAll('.c3-chart-bars .c3-bars-plan .c3-bar').nodes().map((el: any) => el.getBBox().height);
                d3.select(this.chartElement).selectAll('.c3-texts-plan text').nodes().forEach((el: any, i: number) => {
                    d3.select(el).attr('transform', `translate(0, ${planBarHeight[i]})`)
                })
            }
        });
        setTimeout(() => {
            this.chart.load({
                columns: [
                    ['actual', ...dataset.actualSeries.series.map(s => s.value.toString())],
                    ['plan', ...dataset.plannedSeries.series.map(s => s.value.toString())],
                    ['baseline', ...dataset.baselineSeries.series.map(s => s.value.toString())],
                ]
            });
            this.chart.ygrids.add({
                value: dataset.budget,
                class: 'budget-threshold',
                position: 'start',
                text: `${this.thresholdName}: ${dataset.budget.toLocaleString()}`
            });
        }, 0);
    }

    private getDataset(): IFinancialPlanningChart {
        const dataset = this.data!.find(d => d.year === this.selectedYear)!;
        return this.granularity === 'Q'
            ? this.getQuarterlyExpenditure(dataset)
            : this.getMonthlyExpenditure(dataset)
    }

    private getQuarterlyExpenditure(dataset: IFinancialPlanningChart): IFinancialPlanningChart {
        const months = dataset.plannedSeries.series.map(s => s.name);
        const quarters = DateUtility.getQuartersOfMonths(parseInt(months[0]), parseInt(months[months.length - 1]));
        if (quarters.length === 1) {
            return this.getMonthlyExpenditure(dataset);
        }
        
        let baselineSeries: IOvertimeDatasetSeries[] = [];
        let plannedSeries: IOvertimeDatasetSeries[] = [];
        let actualSeries: IOvertimeDatasetSeries[] = [];
        this.xSeries = quarters.map(q => `Q${q}`);
        
        this.xSeries.forEach((q, index) => {
            let baselineValue: number = 0;
            let plannedValue: number = 0;
            let actualValue: number = 0;
            if (q === 'Q1') {
                baselineValue = dataset!.baselineSeries.series
                    .filter(e => parseInt(e.name) <= 3)
                    .map(d => d.value)
                    .reduce((a, b) => a + b);

                plannedValue = dataset!.plannedSeries.series
                    .filter(e => parseInt(e.name) <= 3)
                    .map(d => d.value)
                    .reduce((a, b) => a + b);

                actualValue = dataset!.actualSeries.series
                    .filter(e => parseInt(e.name) <= 3)
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
            }

            if (q === 'Q2') {
                baselineValue = dataset!.baselineSeries.series
                    .filter(e => parseInt(e.name) <= 6)
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
                plannedValue = dataset!.plannedSeries.series
                    .filter(e => parseInt(e.name) <= 6)
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
                actualValue = dataset!.actualSeries.series
                    .filter(e => parseInt(e.name) <= 6)
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
            }

            if (q === 'Q3') {
                baselineValue = dataset!.baselineSeries.series
                    .filter(e => parseInt(e.name) <= 9)
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
                plannedValue = dataset!.plannedSeries.series
                    .filter(e => parseInt(e.name) <= 9)
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
                actualValue = dataset!.actualSeries.series
                    .filter(e => parseInt(e.name) <= 9)
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
            }

            if (q === 'Q4') {
                baselineValue = dataset!.baselineSeries.series
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
                plannedValue = dataset!.plannedSeries.series
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
                actualValue = dataset!.actualSeries.series
                    .map(d => d.value)
                    .reduce((a, b) => a + b);
            }

            if (index === this.xSeries.length - 1) {
                this.maxYLevel = Math.max(dataset!.budget, baselineValue, plannedValue, actualValue);
            }
            
            baselineSeries.push({
                name: q,
                value: baselineValue,
                label: baselineValue.toString()
            });

            plannedSeries.push({
                name: q,
                value: plannedValue,
                label: plannedValue.toString()
            });

            actualSeries.push({
                name: q,
                value: actualValue,
                label: actualValue.toString()
            });
        });


        return {
            year: this.selectedYear,
            budget: dataset!.budget,
            baselineSeries: { name: dataset!.baselineSeries.name, series: baselineSeries},
            plannedSeries: { name: dataset!.plannedSeries.name, series: plannedSeries},
            actualSeries: { name: dataset!.actualSeries.name, series: actualSeries},
        }
    }
    
    private getMonthlyExpenditure(dataset: IFinancialPlanningChart): IFinancialPlanningChart {
        let baselineSeries: IOvertimeDatasetSeries[] = [];
        let plannedSeries: IOvertimeDatasetSeries[] = [];
        let actualSeries: IOvertimeDatasetSeries[] = [];
        this.xSeries = dataset.plannedSeries.series.map(s => s.name);
        this.xSeries.forEach((m, index) => {
            let baselineValue: number = 0;
            let plannedValue: number = 0;
            let actualValue: number = 0;
            baselineValue = dataset!.baselineSeries.series
                .filter(e => parseInt(e.name) <= parseInt(m))
                .map(d => d.value)
                .reduce((a, b) => a + b);
            plannedValue = dataset!.plannedSeries.series
                .filter(e => parseInt(e.name) <= parseInt(m))
                .map(d => d.value)
                .reduce((a, b) => a + b);
            actualValue = dataset!.actualSeries.series
                .filter(e => parseInt(e.name) <= parseInt(m))
                .map(d => d.value)
                .reduce((a, b) => a + b);

            if (index === this.xSeries.length - 1) {
                this.maxYLevel = Math.max(dataset!.budget, baselineValue, plannedValue, actualValue);
            }

            baselineSeries.push({
                name: m,
                value: baselineValue,
                label: baselineValue.toString()
            });

            plannedSeries.push({
                name: m,
                value: plannedValue,
                label: plannedValue.toString()
            });

            actualSeries.push({
                name: m,
                value: actualValue,
                label: actualValue.toString()
            });
        });

        return {
            year: this.selectedYear,
            budget: dataset!.budget,
            baselineSeries: { name: dataset!.baselineSeries.name, series: baselineSeries},
            plannedSeries: { name: dataset!.plannedSeries.name, series: plannedSeries},
            actualSeries: { name: dataset!.actualSeries.name, series: actualSeries},
        }
    }
    
    private getLabel(value: number): string {
        if (value === 0) return '';
        const numberToThousands = value / 1000000;
        if (numberToThousands > 1) {
            return `${numberToThousands.toLocaleString()}M`;
        }

        return `${(numberToThousands * 1000).toLocaleString()}K`;
    }
}
