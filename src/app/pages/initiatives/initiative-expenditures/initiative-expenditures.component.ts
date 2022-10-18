import {Component, Input, OnInit} from '@angular/core';
import {NumberUtility} from "../../../core/utilities/number.utility";
import {ApiService} from "../../../core/services/api.service";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {IExpenditureSummary} from "../core/models/expenditure/expenditure-summary.model";
import * as _ from 'lodash';
import {MonthUtility} from "../../../core/utilities/month.utility";

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
        this.data$ = this.api.get<IExpenditureSummary[]>(`expenditures?initiativeId=${this.initiativeId}`).pipe(
            map(res => {
                let result: IExpenditureSummaryTable[] = [];
                
                let years = _.uniq(res.result.map(e => e.year));
                years.forEach(year => {
                    result.unshift({
                        year: year,
                        expenditures: res.result.filter(r => r.year == year)?.map(e => ({
                            month: MonthUtility.parse(e.month.toString()),
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
}
