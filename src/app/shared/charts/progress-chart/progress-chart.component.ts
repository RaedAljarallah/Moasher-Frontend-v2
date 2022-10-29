import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import * as c3 from "c3";
import * as d3 from "d3";
import * as _ from 'lodash';
import {Color} from "@swimlane/ngx-charts";
import {progressColorScheme} from "../color-schemes";
import {IProgressChart} from "../models/progress-chart.model";

@Component({
    selector: 'app-progress-chart',
    templateUrl: './progress-chart.component.html',
    styles: []
})
export class ProgressChartComponent implements OnInit, AfterViewInit {
    @Input() values?: IProgressChart | null;
    @Input() title: string = '';
    @ViewChildren('progressChart') chartElm?: QueryList<ElementRef>;

    private chart: any;
    private chartElement: any;
    private scheme: Color = progressColorScheme;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.chartElm?.changes.subscribe((elm) => {
            this.chartElement = elm.toArray()[0].nativeElement;
            this.generateChart();
        });
    }

    private generateChart(): void {
        this.chart = c3.generate({
            bindto: this.chartElement,
            data: {
                columns: [
                    ['planned', 0],
                    ['actual', 0]
                ],
                type: 'gauge',
                colors: {
                    planned: this.scheme.domain[1],
                    actual: this.scheme.domain[0]
                },
                names: {
                    planned: 'المخطط',
                    actual: 'الفعلي'
                }
            },
            gauge: {
                label: {
                    format(value: number, ratio: number, id: string): string | number {
                        return id === 'planned'
                            ? `${_.round(ratio * 100, 2)}%`
                            : ''
                    }
                },
                labelLine: {
                    show: true
                }
            },
            legend: {
                show: true
            },
            tooltip: {
                show: false
            },
            oninit: () => {
                d3.select(this.chartElement)
                    .select('text.c3-chart-arcs-title')
                        .text(`${_.round(this.values!.actual, 2)}%`)
                
                d3.select(this.chartElement)
                    .select('text.c3-chart-arcs-gauge-min')
                    .style('display', 'none');

                d3.select(this.chartElement)
                    .select('text.c3-chart-arcs-gauge-max')
                    .style('display', 'none');
            },
            onrendered: () => {
                d3.select(this.chartElement)
                    .select('rect.c3-arc-label-line.c3-target.c3-target-actual')
                    .style('display', 'none');
            }
        });

        setTimeout(() => {
            this.chart.load({
                columns: [
                    ['planned', this.values!.planned],
                    ['actual', this.values!.actual],

                ]
            })
        }, 0);
    }
}
