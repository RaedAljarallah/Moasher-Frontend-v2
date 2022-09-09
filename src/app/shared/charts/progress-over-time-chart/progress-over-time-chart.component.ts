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
import {IOvertimeChart} from "../models/overtime-chart.model";
import {Color} from "@swimlane/ngx-charts";
import {overTimeColorScheme} from "../color-schemes";
import * as c3 from "c3";
import * as _ from 'lodash';

@Component({
    selector: 'app-progress-over-time-chart',
    templateUrl: './progress-over-time-chart.component.html',
    styles: []
})
export class ProgressOverTimeChartComponent implements OnInit, AfterViewInit {
    @Input() values: IOvertimeChart[] | null = [];
    @Input() title: string = '';

    @ViewChildren('overTimeChart') chartElm?: QueryList<ElementRef>;
    private chart: any;
    private chartElement: any;

    public scheme: Color = overTimeColorScheme;
    public selectedYear: number = 0;
    public years: number[] = [];
    public granularity: number = 0;
    constructor(private cd: ChangeDetectorRef) {
    }
    
    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.chartElm?.changes.subscribe((elm) => {
            if (!this.values) return;
            // this.years = this.data.map(v => v.year).sort();
            this.years = [2019, 2020, 2021];
            this.selectedYear = this.years[this.years.length - 1];
            this.years = this.years.sort((one, two) => (one > two ? -1 : 1));
            this.chartElement = elm.toArray()[0].nativeElement;
            this.generateChart();
            this.cd.detectChanges();
        });
    }

    private generateChart(): void {
        this.chart = c3.generate({
            bindto: this.chartElement,
            data: {
                columns: [
                    ['actual', 0],
                    ['plan', 0]
                ],
                colors: {
                    actual: this.scheme.domain[0],
                    plan: this.scheme.domain[1],
                },
                type: 'area',
                names: {
                    actual:'الإنجاز الفعلي',
                    plan: 'الإنجاز المخطط',
                },
                labels: {
                    format: (_v: number | { valueOf(): number }, id: string, i: number) => {
                        return  id === 'plan'
                            ? 'على المسار'
                            : ''
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
                    categories: ['Q1', 'Q2', 'Q3', 'Q4']
                }
            },
        });

        setTimeout(() => {
            this.chart.load({
                columns: [
                    ['actual', '20', '25', '27', '32'],
                    ['plan', '25', '30', '35', '39'],
                ]
            })
        }, 0);
    }

    public onYearSelected(year: number): void {
        this.selectedYear = year;
        this.generateChart();
    }

    public onGranularityChanged(granularity: number): void {
        this.granularity = granularity;
        this.generateChart();
    }
}
