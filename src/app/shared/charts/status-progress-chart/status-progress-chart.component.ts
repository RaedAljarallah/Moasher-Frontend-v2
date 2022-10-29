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
import {IStatusProgressChart} from "../models/status-progress-chart.model";
import {Color} from "@swimlane/ngx-charts";
import {financialPlanColorScheme, overTimeColorScheme} from "../color-schemes";
import {DateUtility} from "../../../core/utilities/date.utility";
import * as c3 from "c3";
import * as _ from "lodash";

@Component({
    selector: 'app-status-progress-chart',
    templateUrl: './status-progress-chart.component.html',
    styles: []
})
export class StatusProgressChartComponent implements OnInit, AfterViewInit {
    @Input() data: IStatusProgressChart[] | null = [];
    @Input() title: string = '';
    @ViewChildren('overTimeChart') chartElm?: QueryList<ElementRef>;
    private chart: any;
    private chartElement: any;

    public scheme: Color = financialPlanColorScheme;
    public selectedYear: number = 0;
    public years: number[] = [];
    public granularity: 'M' | 'Q' = 'Q';
    
    private xSeries: string[] = [];
    private titles: string[][] = [];
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
    
    public onYearSelected(year: number): void {
        this.selectedYear = year;
        this.generateChart();
    }

    public onGranularityChanged(granularity: 'M' | 'Q'): void {
        this.granularity = granularity;
        this.generateChart();
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
                columns: dataset.names!.map((_, i) => [(i + 1).toString(), 0]),
                colors: this.getColors(dataset!.scheme),
                type: 'line',
                names: this.getNames(dataset!.names!),
                labels: {
                    format: (_v: number | { valueOf(): number }, id: string, i: number) => {
                        return !isNaN(i) ? this.titles[i][parseInt(id) - 1] : '';

                    }
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
                },
                x: {
                    type: 'category',
                    categories: this.xSeries
                }
            },
        });

        setTimeout(() => {
            this.chart.load({
                columns: this.getValues(dataset)
            })
        }, 0);
    }

    private getDataset(): IStatusProgressChart {
        const dataset = this.data!.find(d => d.year === this.selectedYear)!;
        return this.granularity === 'Q'
            ? this.getQuarterlyProgress(dataset)
            : this.getMonthlyProgress(dataset);
    }

    private getQuarterlyProgress(dataset: IStatusProgressChart): IStatusProgressChart {
        const months = dataset.datasets.map(d => d.name);
        const quarters = DateUtility.getQuartersOfMonths(parseInt(months[0]), parseInt(months[months.length - 1]));
        if (quarters.length === 1) {
            return this.getMonthlyProgress(dataset);
        }
        let result:  {name: string, values: {label: string, value: number}[]}[] = [];
        this.xSeries = quarters.map(q => `Q${q}`);
        this.xSeries.forEach(q => {
            let values: {label: string, value: number}[] = [];
            if (q === 'Q1') {
                values = dataset.datasets
                    .filter((e => parseInt(e.name) >=1 && parseInt(e.name) <= 3))
                    .slice(-1)[0].values;
            }

            if (q === 'Q2') {
                values = dataset.datasets
                    .filter((e => parseInt(e.name) >=4 && parseInt(e.name) <= 6))
                    .slice(-1)[0].values; 
            }

            if (q === 'Q3') {
                values = dataset.datasets
                    .filter((e => parseInt(e.name) >=7 && parseInt(e.name) <= 9))
                    .slice(-1)[0].values;
            }

            if (q === 'Q4') {
                values = dataset.datasets
                    .filter((e => parseInt(e.name) >=10 && parseInt(e.name) <= 12))
                    .slice(-1)[0].values;
            }
            
            result.push({
                name: q,
                values: values
            })
        });
        
        this.titles = this.getTitles(result);
        return {
            year: this.selectedYear,
            scheme: dataset.scheme,
            datasets: result,
            names: result[0].values.map(v => v.label)
        }
    }

    private getMonthlyProgress(dataset: IStatusProgressChart): IStatusProgressChart {
        this.xSeries = dataset.datasets.map(d => d.name);
        this.titles = this.getTitles(dataset.datasets);
        return {
            year: this.selectedYear,
            scheme: dataset.scheme,
            datasets: dataset.datasets,
            names: dataset.datasets[0].values.map(v => v.label)
        }
    }
    
    private getColors(schemes: string[]): {[key: string]: string} {
        let result: {[key: string]: string} = {}
        schemes.forEach((scheme: string, i: number) => {
            result[i + 1] = scheme;
        });
        
        return result;
    }
    
    private getNames(names: string[]): {[key: string]: string} {
        let result: {[key: string]: string} = {};
        names.forEach((name: string, i: number) => {
            result[i + 1] = name;
        });
        
        return result;
    }
    
    private getValues(dataset: IStatusProgressChart): string[][] {
        let result: string[][] = [];
        dataset.names!.forEach((n: string, i: number) => {
            let item: string[] = [(i + 1).toString()];
            dataset.datasets.forEach(data => {
                let values = data.values.filter(v => v.label === n).map(v => v.value.toString());
                item.push(...values);
            })
            
            result.push(item);
        });
        
        return result;
    }
    
    private getTitles(datasets:  {name: string, values: {label: string, value: number}[]}[]): string[][] {
        let result: string[][] = [];
        datasets.forEach(data => {
            let items: string[] = [];
            data.values.forEach(v => {
                if (!items.includes(v.value.toString() + "%")) {
                    items.push(_.round(v.value, 2) + "%")
                } else {
                    items.push('');
                }
            });
            result.push(items);
        });
        
        return result;
    }
}
