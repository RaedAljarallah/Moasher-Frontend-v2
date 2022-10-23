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
import {IOvertimeDatasetSeries} from "../models/overtime-chart.model";
import {Color} from "@swimlane/ngx-charts";
import {overTimeColorScheme} from "../color-schemes";
import * as c3 from "c3";
import * as _ from 'lodash';
import {IProgressOvertimeChart} from "../models/progress-overtime-chart.model";
import {DateUtility} from "../../../core/utilities/date.utility";

@Component({
    selector: 'app-progress-over-time-chart',
    templateUrl: './progress-over-time-chart.component.html',
    styles: []
})
export class ProgressOverTimeChartComponent implements OnInit, AfterViewInit {
    @Input() data: IProgressOvertimeChart[] | null = [];
    @Input() title: string = '';

    @ViewChildren('overTimeChart') chartElm?: QueryList<ElementRef>;
    private chart: any;
    private chartElement: any;

    public scheme: Color = overTimeColorScheme;
    public selectedYear: number = 0;
    public years: number[] = [];
    public granularity: 'M' | 'Q' = 'Q';
    public xSeries: string[] = [];
    constructor(private cd: ChangeDetectorRef) {
    }
    
    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        this.chartElm?.changes.subscribe((elm) => {
            if (!this.data) return;
            this.years = this.data.map(v => v.year).sort();
            const lastYear = this.years[this.years.length - 1];
            const currentYear = DateUtility.getCurrentYear();
            this.selectedYear = currentYear > lastYear ? lastYear : currentYear;
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
                    ['planned', 0]
                ],
                colors: {
                    actual: this.scheme.domain[0],
                    planned: this.scheme.domain[1],
                },
                type: 'area',
                names: {
                    actual: dataset!.actualSeries.name,
                    planned: dataset!.plannedSeries.name
                },
                labels: {
                    format: (_v: number | { valueOf(): number }, id: string, i: number) => {
                        return  !isNaN(i) && dataset.peakTitles![i].id == id
                            ? dataset.peakTitles![i].title
                            : ''
                    },
                    
                }
            },
            legend: { show: true },
            tooltip: {
                format: {
                    value: (value: number) => _.round(value, 2) + "%",
                    title: () => ''
                }
            },
            axis: {
                y: {
                    show: false,
                    max: 100
                },
                x: {
                    type: 'category',
                    categories: this.xSeries
                }
            },
        });

        setTimeout(() => {
            this.chart.load({
                columns: [
                    ['actual', ...dataset.actualSeries.series.map(s => s.value.toString())],
                    ['planned', ...dataset.plannedSeries.series.map(s => s.value.toString())],
                ]
            })
        }, 0);
    }

    public onYearSelected(year: number): void {
        this.selectedYear = year;
        this.generateChart();
    }

    public onGranularityChanged(granularity: 'M' | 'Q'): void {
        this.granularity = granularity;
        this.generateChart();
    }
    
    private getDataset(): IProgressOvertimeChart {
        const dataset = this.data!.find(d => d.year === this.selectedYear)!;

        return this.granularity === 'Q' 
            ? this.getQuarterlyProgress(dataset) 
            : this.getMonthlyProgress(dataset);

    }
    
    private getQuarterlyProgress(dataset: IProgressOvertimeChart): IProgressOvertimeChart {
        const months = dataset.plannedSeries.series.map(s => s.name);
        const quarters = DateUtility.getQuartersOfMonths(parseInt(months[0]), parseInt(months[months.length - 1]));
        if (quarters.length === 1) {
            return this.getMonthlyProgress(dataset);
        }

        let plannedSeries: IOvertimeDatasetSeries[] = [];
        let actualSeries: IOvertimeDatasetSeries[] = [];
        this.xSeries = quarters.map(q => `Q${q}`);
        this.xSeries.forEach(q => {
            let intervalPlannedSeries!: IOvertimeDatasetSeries;
            let intervalActualSeries!: IOvertimeDatasetSeries;
            if (q === 'Q1') {
                intervalPlannedSeries = dataset!.plannedSeries.series
                    .filter((e => parseInt(e.name) >=1 && parseInt(e.name) <= 3))
                    .slice(-1)[0];

                intervalActualSeries = dataset!.actualSeries.series
                    .filter((e => parseInt(e.name) >=1 && parseInt(e.name) <= 3))
                    .slice(-1)[0];
            }

            if (q === 'Q2') {
                intervalPlannedSeries = dataset!.plannedSeries.series
                    .filter((e => parseInt(e.name) >=4 && parseInt(e.name) <= 6))
                    .slice(-1)[0];

                intervalActualSeries = dataset!.actualSeries.series
                    .filter((e => parseInt(e.name) >=4 && parseInt(e.name) <= 6))
                    .slice(-1)[0];
            }

            if (q === 'Q3') {
                intervalPlannedSeries = dataset!.plannedSeries.series
                    .filter((e => parseInt(e.name) >=7 && parseInt(e.name) <= 9))
                    .slice(-1)[0];

                intervalActualSeries = dataset!.actualSeries.series
                    .filter((e => parseInt(e.name) >=7 && parseInt(e.name) <= 9))
                    .slice(-1)[0];
            }

            if (q === 'Q4') {
                intervalPlannedSeries = dataset!.plannedSeries.series
                    .filter((e => parseInt(e.name) >=10 && parseInt(e.name) <= 12))
                    .slice(-1)[0];

                intervalActualSeries = dataset!.actualSeries.series
                    .filter((e => parseInt(e.name) >=10 && parseInt(e.name) <= 12))
                    .slice(-1)[0];
            }

            plannedSeries.push({
                name: q,
                value: intervalPlannedSeries.value,
                label: intervalPlannedSeries.label
            });

            actualSeries.push({
                name: q,
                value: intervalActualSeries.value,
                label: intervalActualSeries.label
            });
        });

        return {
            year: this.selectedYear,
            peakTitles: this.getPeakTitles(plannedSeries, actualSeries),
            plannedSeries: { name: dataset!.plannedSeries.name, series: plannedSeries},
            actualSeries: { name: dataset!.actualSeries.name, series: actualSeries},
        }
    }
    
    private getMonthlyProgress(dataset: IProgressOvertimeChart): IProgressOvertimeChart {
        this.xSeries = dataset.plannedSeries.series.map(s => s.name);
        return {
            year: this.selectedYear,
            peakTitles: this.getPeakTitles(dataset!.plannedSeries!.series, dataset!.actualSeries!.series),
            plannedSeries: dataset!.plannedSeries,
            actualSeries: dataset!.actualSeries
        }
    }
    
    private getPeakTitles(plannedSeries: IOvertimeDatasetSeries[], actualSeries: IOvertimeDatasetSeries[]): { id: string, title: string }[] {
        const titles: string[] = plannedSeries.map(s => s.label);
        let result: { id: string, title: string }[] = [];
        
        titles.forEach((value: string, index: number) => {
            if (plannedSeries[index].value > actualSeries[index].value) {
                result.push({ id: 'planned', title: value });
            } else {
                result.push({ id: 'actual', title: value });
            }
        });
        
        return result;
    }
}
