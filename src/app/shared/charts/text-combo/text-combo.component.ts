import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {IOvertimeChart} from "../models/overtime-chart.model";
import {Color} from "@swimlane/ngx-charts";
import {financialPlanColorScheme} from "../color-schemes";
import * as c3 from "c3";
import * as d3 from 'd3';
import {LocalCurrencyPipe} from "../../pipes/local-currency.pipe";

@Component({
    selector: 'app-text-combo',
    templateUrl: './text-combo.component.html',
    styles: []
})
export class TextComboComponent implements OnInit, AfterViewInit {
    @Input() data: IOvertimeChart[] | null = [];
    @Input() title: string = '';
    @ViewChildren('financialPlanningChart') chartElm?: QueryList<ElementRef>;

    private chart: any;
    private chartElement: any;
    
    public scheme: Color = financialPlanColorScheme;
    public selectedYear: number = 0;
    public years: number[] = [];
    public granularity: number = 0;
    constructor(private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        this.chartElm?.changes.subscribe((elm) => {
            if (!this.data) return;
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
                    actual:'المنصرف الفعلي',
                    plan: 'المخطط بعد التعديل',
                    baseline: 'المخطط الأصلي'
                },
                labels: {
                    format: (_v: number | { valueOf(): number }, id: string, i: number) => {
                        return '5M';
                        // return id === 'actual' || id === 'plan'
                        //     ? '5M'
                        //     : ''
                    }
                }
            },
            
            legend: {
                show: true,
                hide: 'budget'
            },
            tooltip: {
                format: {
                    value: (value: number) => `${new LocalCurrencyPipe().transform(value)}`,
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
            grid: {
                y: {
                    lines:[
                        { value: 18000, class: 'budget-threshold',position:'start', text: 'السيولة: 18000' }
                    ]
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
                    ['actual', '3000', '4000', '8000', '9000'],
                    ['plan', '5000', '6000', '10000', '11000'],
                    ['baseline', '7000', '10000', '11000', '17000'],
                    
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
