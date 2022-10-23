import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import * as c3 from "c3";
import * as _ from 'lodash';

import {Color} from "@swimlane/ngx-charts";
import {financialPlanColorScheme} from "../color-schemes";
import {IPerformanceCardValue} from "../models/performance-card-value.model";

@Component({
    selector: 'app-performance-card',
    templateUrl: './performance-card.component.html',
    styles: []
})
export class PerformanceCardComponent implements OnInit, AfterViewInit {
    @Input() values: IPerformanceCardValue | null | undefined = null;
    @Input() limitPercentageToHundred: boolean = false;
    @ViewChildren('performanceChart') chartElm?: QueryList<ElementRef>;
    
    private chart: any;
    private chartElement: any;
    private scheme: Color = financialPlanColorScheme;
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
        const dataSet = this.getDataSet();
        this.chart = c3.generate({
            bindto: this.chartElement,
            data: {
                columns: [
                    ['actual', 0],
                    ['remaining', 0],
                ],
                colors: {
                    actual: this.scheme.domain[2],
                    remaining: this.scheme.domain[0]
                },
                type: 'donut',
                order: dataSet.actual > dataSet.remaining ? 'desc' : 'asc',
            },
            donut: {
                title: `${dataSet.percentage}%`,
                label: {
                    show: false
                },
                width: 10,
            },
            legend: {
                show: false
            },
            tooltip: {
                show: false
            },
            axis: {
                x: { show: false },
                y: { show: false }
            }
        });
        setTimeout(() => {
            this.chart.load({
                columns: [
                    ['actual', (dataSet.actual === 0 && dataSet.remaining === 0) ? 1 : dataSet.actual],
                    ['remaining', (dataSet.actual === 0 && dataSet.remaining === 0) ? 0 : dataSet.remaining],

                ]
            })
        }, 0);
    }
    
    private getDataSet(): { actual: number, remaining: number, percentage: number } {
        const remaining = this.values!.target.value - this.values!.actual.value < 0 
            ? 0 
            : this.values!.target.value - this.values!.actual.value;
        
        let percentage = this.values!.target.value === 0 
            ? 100 
            : (this.values!.actual.value / this.values!.target.value) * 100;
        
        if (percentage > 100 && this.limitPercentageToHundred) {
            percentage = 100;
        }
        
        return {
            actual: this.values!.actual.value,
            remaining: remaining,
            percentage: _.round(percentage, percentage < 1 ? 2 : 0)
        }
    }
}
