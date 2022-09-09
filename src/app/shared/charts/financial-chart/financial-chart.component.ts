import {Component, Input, OnInit} from '@angular/core';
import {IChartValue} from "../models/chart-value.model";
import {Color} from "@swimlane/ngx-charts";
import {financialColorScheme} from "../color-schemes";
import {IFinancialChart} from "../models/financial-chart.model";

@Component({
    selector: 'app-financial-chart',
    templateUrl: './financial-chart.component.html',
    styleUrls: ['./financial-chart.component.css']
})
export class FinancialChartComponent implements OnInit {
    @Input() isLoading: boolean = true;
    @Input() data?: IFinancialChart;
    @Input() title: string = '';
    
    public scheme: Color = financialColorScheme;
    
    constructor() {
    }

    ngOnInit(): void {
    }

}
