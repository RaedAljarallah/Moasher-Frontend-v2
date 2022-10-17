import {Component, Input, OnInit} from '@angular/core';
import {NumberUtility} from "../../../core/utilities/number.utility";
import {ApiService} from "../../../core/services/api.service";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {IExpenditureSummary} from "../core/models/expenditure/expenditure-summary.model";
import * as _ from 'lodash';
import { Dictionary } from 'lodash';

export interface IExpenditureSummaryTable {
    year: number,
    expenditures: {
        month: number,
        initialPlannedAmount: number;
        plannedAmount: number;
        actualAmount?: number;
        initialPlannedAmountCumulative: number,
        plannedAmountCumulative: number,
        actualAmountCumulative: number
    }[]
}

@Component({
    selector: 'app-initiative-expenditures',
    templateUrl: './initiative-expenditures.component.html',
    styles: []
})
export class InitiativeExpendituresComponent implements OnInit {
    @Input() initiativeId: string = '';
    public monthsRange: number[] = NumberUtility.range(1, 12);
    public data$: Observable<IExpenditureSummaryTable[]>;

    constructor(private api: ApiService) {
        this.data$ = new Observable<IExpenditureSummaryTable[]>();
    }
    
    ngOnInit(): void {
        this.data$ = this.api.get<IExpenditureSummary[]>(`expenditures/summary?initiativeId=${this.initiativeId}`).pipe(
            map(res => {
                let result: IExpenditureSummaryTable[] = [];
                
                let years = _.uniq(res.result.map(e => e.year));
                years.forEach(year => {
                    result.unshift({
                        year: year,
                        expenditures: res.result.filter(r => r.year == year)?.map(e => ({
                            month: this.parseMonth(e.month.toString()),
                            initialPlannedAmount: e.initialPlannedAmount,
                            plannedAmount: e.plannedAmount,
                            actualAmount: e.actualAmount,
                            initialPlannedAmountCumulative: e.initialPlannedAmountCumulative,
                            plannedAmountCumulative: e.plannedAmountCumulative,
                            actualAmountCumulative: e.actualAmountCumulative
                        }))
                    })
                })
                return result;
            })
        );
    }

    private parseMonth(month: string): number {
        switch (month.toLowerCase()) {
            case 'one':
                return 1;
            case 'two':
                return 2;
            case 'three':
                return 3;
            case 'four':
                return 4;
            case 'five':
                return 5;
            case 'six':
                return 6;
            case 'seven':
                return 7;
            case 'eight':
                return 8;
            case 'nine':
                return 9;
            case 'ten':
                return 10;
            case 'eleven':
                return 11;
            case 'twelve':
                return 12;
            default:
                return 13;
        }
    }
}
