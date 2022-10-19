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
import {IAreaDateSet} from "../models/area-data-set.model";
import {IProgressOvertimeChart} from "../models/progress-overtime-chart.model";

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
    
    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
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
                        // return  !isNaN(i) && dataset.peakTitles[i].area == id
                        //     ? dataset.peakTitles[i].title
                        //     : ''
                        
                        return '';
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
                columns: [
                    ['actual', '20', '25', '27', '32'],
                    ['planned', '25', '30', '35', '39'],
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
        const dataset = this.data!.find(d => d.year === this.selectedYear);
        return dataset!;
        
    }
}
