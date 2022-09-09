import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {IOvertimeChart} from "../models/overtime-chart.model";
import {Color} from "@swimlane/ngx-charts";
import {financialPlanColorScheme} from "../color-schemes";
import * as c3 from "c3";
import {LocalCurrencyPipe} from "../../pipes/local-currency.pipe";
import {IAreaDateSet} from "../models/area-data-set.model";
import {IComboDataSet} from "../models/combo-data-set.model";

@Component({
    selector: 'app-financial-planning-efficiency-chart',
    templateUrl: './financial-planning-efficiency-chart.component.html',
    styles: []
})
export class FinancialPlanningEfficiencyChartComponent implements OnInit, AfterViewInit {

    @Input() data: IOvertimeChart[] | null = null;
    @Input() title: string = '';
    @ViewChildren('financialPlanningChart') chartElm?: QueryList<ElementRef>;

    private chart: any;
    private chartElement: any;

    public scheme: Color = financialPlanColorScheme;
    public selectedYear: number = 0;
    public years: number[] = [];
    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        this.chartElm?.changes.subscribe((elm) => {
            if (!this.data) return;
            this.years = this.data.map(v => v.year).sort();
            this.selectedYear = this.years[this.years.length - 1];
            this.chartElement = elm.toArray()[0].nativeElement;
            this.generateChart();
        });
    }

    private generateChart(): void {
        if (this.data!.length > 0) {
            const dataSet = this.getDataset();

            this.chart = c3.generate({
                bindto: this.chartElement,
                data: {
                    x: 'x',
                    columns: [
                        ['x', 0],
                        ['firstArea', 0],
                        ['secondArea', 0]

                    ],
                    colors: {
                        firstArea: this.scheme.domain[0],
                        secondArea: this.scheme.domain[1]
                    },
                    type: 'area',
                    names: {
                        firstArea: dataSet.firstArea.title,
                        secondArea: dataSet.secondArea.title
                    },
                    labels: {
                        format: (_v: number | { valueOf(): number }, id: string, i: number) =>
                            !isNaN(i) && dataSet.peakTitles[i].area == id
                                ? dataSet.peakTitles[i].title
                                : ''
                    },
                    onclick: (d: c3.DataPoint) => {
                        console.log(this.getInterval(d.x));

                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    format: {
                        value: (value: number) => `${new LocalCurrencyPipe().transform(value)}`,
                        title: () => ''
                    }
                },
                axis: {
                    y: {
                        show: false
                    },
                    x: {
                        type: 'category'
                    }
                },
                size: {
                    height: 205
                }
            });

            setTimeout(() => {
                this.chart.load({
                    columns: [
                        ['data1', 300, 100, 250, 150, 300, 150, 500],
                        ['data2', 100, 200, 150, 50, 100, 250]
                    ]
                });
            }, 0);
        }
    }

    public onYearSelected(year: number): void {
        this.selectedYear = year;
        this.generateChart();
    }

    private getDataset(): IAreaDateSet {
        let dataset = this.data!.find(v => v.year == this.selectedYear)!;
        return {
            xTicks: this.toStringArray('x', dataset.datasets[0].series.map(s => s.name)),
            peakTitles: this.getPeakTitles(dataset),
            firstArea: {
                title: dataset.datasets[0].name,
                values: this.toStringArray('firstArea', dataset.datasets[0].series.map(s => s.value)),
                labels: dataset.datasets[0].series.map(s => s.label)
            },
            secondArea: {
                title: dataset.datasets[1].name,
                values: this.toStringArray('secondArea', dataset.datasets[1].series.map(s => s.value)),
                labels: dataset.datasets[1].series.map(s => s.label)
            }
        }
    }

    private toStringArray(title: string, values: number[] | string[]): string[] {
        const array = [title];
        for (const val of values) {
            array.push(`${val}`);
        }

        return array;
    }

    private getPeakTitles(dataset: IOvertimeChart): { area: string, title: string }[] {
        let titles: string[] = [];
        let array: { area: string, title: string }[] = [];
        if (dataset.datasets[0].series[0] && dataset.datasets[0].series[0].label !== '') {
            titles = dataset.datasets[0].series.map(s => s.label);
        } else {
            titles = dataset.datasets[1].series.map(s => s.label);
        }

        titles.forEach((value, index) => {
            let firstAreaValue = dataset.datasets[0].series[index].value;
            let secondAreaValue = dataset.datasets[1].series[index].value;
            if (firstAreaValue > secondAreaValue) {
                array.push({ area: 'firstArea', title: value });
            } else {
                array.push({ area: 'secondArea', title: value });
            }
        });
        return array;
    }

    private getInterval(xTick: number): string {
        return `Q${xTick + 1}-${this.selectedYear}`;
    }

    // @Input() data: IOvertimeChart[] | null = [];
    // @Input() title: string = '';
    // @ViewChildren('financialPlanningChart') chartElm?: QueryList<ElementRef>;
    //
    // private chart: any;
    // private chartElement: any;
    //
    // public scheme: Color = financialPlanColorScheme;
    // public selectedYear: number = 0;
    // public years: number[] = [];
    // constructor() {
    // }
    //
    // ngOnInit(): void {
    // }
    //
    // public ngAfterViewInit(): void {
    //     this.chartElm?.changes.subscribe((elm) => {
    //         if (!this.data) return;
    //         this.years = this.data.map(v => v.year).sort();
    //         this.selectedYear = this.years[this.years.length - 1];
    //         this.chartElement = elm.toArray()[0].nativeElement;
    //         this.generateChart();
    //     });
    // }
    //
    // private generateChart(): void {
    //     const dataSet = this.getDataset();
    //
    //     this.chart = c3.generate({
    //         bindto: this.chartElement,
    //         data: {
    //             x: 'x',
    //             columns: [
    //                 ['x', 0],
    //                 ['actual', 0],
    //                 ['baseline', 0],
    //                 ['plan', 0]
    //             ],
    //             colors: {
    //                 actual: this.scheme.domain[2],
    //                 baseline: this.scheme.domain[0],
    //                 plan: this.scheme.domain[1]
    //             },
    //             axes: {
    //                 actual: 'y',
    //             },
    //             types: {
    //                 actual: 'bar'
    //             },
    //             names: {
    //                 actual: dataSet.actual.title,
    //                 baseline: dataSet.baseline.title,
    //                 plan: dataSet.baseline.title
    //             },
    //             // labels: {
    //             //     format: (_v: number | { valueOf(): number }, id: string, i: number) => {
    //             //        
    //             //     }
    //             // }
    //         },
    //         legend: {
    //             show: true
    //         },
    //         tooltip: {
    //             format: {
    //                 value: (value: number) => `${new LocalCurrencyPipe().transform(value)}`,
    //                 title: () => ''
    //             }
    //         },
    //         axis: {
    //             y: {
    //                 show: false
    //             },
    //             x: {
    //                 type: 'category'
    //             }
    //         },
    //     });
    //     setTimeout(() => {
    //         this.chart.load({
    //             columns: [
    //                 dataSet.xTicks,
    //                 dataSet.actual.values,
    //                 dataSet.baseline.values,
    //                 dataSet.plan.values
    //             ]
    //         })
    //     }, 0);
    // }
    //
    // public onYearSelected(year: number): void {
    //     this.selectedYear = year;
    //     this.generateChart();
    // }
    //
    // private getDataset(): IComboDataSet {
    //     let dataset = this.data!.find(v => v.year == this.selectedYear)!;
    //     return {
    //         xTicks: TextComboComponent.toStringArray('x', dataset.datasets[0].series.map(s => s.name)),
    //         baseline: {
    //             title: dataset.datasets[0].name,
    //             values: TextComboComponent.toStringArray('baseline', dataset.datasets[0].series.map(s => s.value)),
    //             labels: dataset.datasets[0].series.map(s => s.label)
    //         },
    //         plan: {
    //             title: dataset.datasets[1].name,
    //             values: TextComboComponent.toStringArray('plan', dataset.datasets[1].series.map(s => s.value)),
    //             labels: dataset.datasets[1].series.map(s => s.label)
    //         },
    //         actual: {
    //             title: dataset.datasets[2].name,
    //             values: TextComboComponent.toStringArray('actual', dataset.datasets[2].series.map(s => s.value)),
    //             labels: dataset.datasets[2].series.map(s => s.label)
    //         }
    //     }
    // }
    //
    // private static toStringArray(title: string, values: number[] | string[]): string[] {
    //     const array = [title];
    //     for (const val of values) {
    //         array.push(`${val}`);
    //     }
    //
    //     return array;
    // }
}
