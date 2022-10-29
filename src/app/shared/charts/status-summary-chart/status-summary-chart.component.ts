import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {IStatusSummaryChart} from "../models/status-summary-chart.model";

@Component({
    selector: 'app-status-summary-chart',
    templateUrl: './status-summary-chart.component.html',
    styles: []
})
export class StatusSummaryChartComponent implements OnInit, OnChanges {
    @Input() data?: IStatusSummaryChart | null;
    @Input() title: string = '';
    public scheme!: Color;
    constructor() {
        this.formatLabel = this.formatLabel.bind(this);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.data) {
            this.scheme = {
                name: 'status',
                selectable: true,
                group: ScaleType.Ordinal,
                domain: this.data?.schemes ?? []
            }
        }
    }

    ngOnInit(): void {
        
    }

    public get total(): number {
        if (!this.data) return 0;
        if (this.data.values.length === 0) return 0;
        return this.data.values.map(v => v.value).reduce((a, b) => a + b);
    }

    public formatLabel(label: string): string {
        let value = this.data?.values.find(v => v.name === label);
        if (value) {
            return `${value.name} | ${value.value}`;
        }
        return label;

    }
}
