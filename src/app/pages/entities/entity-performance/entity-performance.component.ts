import {Component, Input, OnInit} from '@angular/core';
import {IPerformanceCardValue} from "../../../shared/charts/models/performance-card-value.model";
import {ApiService} from "../../../core/services/api.service";
import {IInitiativeFinancialSummaryChart} from "../../../shared/charts/models/initiative-financial-summary-chart.model";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-entity-performance',
    templateUrl: './entity-performance.component.html',
    styles: []
})
export class EntityPerformanceComponent implements OnInit {
    @Input() entityId: string = '';
    public currentYearSpendingPerformance?: IPerformanceCardValue;
    public currentPeriodContractingPerformance?: IPerformanceCardValue;
    public currentPeriodSpendingPerformance?: IPerformanceCardValue;
    public allTimeSpendingPerformance?: IPerformanceCardValue;
    public fundingPerformance?: IPerformanceCardValue;
    public contractingPerformance?: IPerformanceCardValue;

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.getInitiativeSummary();
    }

    private getInitiativeSummary(): void {
        this.api.get<IInitiativeFinancialSummaryChart>(`initiatives/summary?entityId=${this.entityId}`)
            .pipe(map(res => res.result)).subscribe(result => {
                this.fundingPerformance = {
                    target: {
                        name: 'إجمالي التكاليف',
                        value: result.requiredCost
                    },
                    actual: {
                        name: 'التكاليف المعتمدة',
                        value: result.approvedCost
                    }
                }

                this.contractingPerformance = {
                    target: {
                        name: 'التكاليف المعتمدة',
                        value: result.approvedCost
                    },
                    actual: {
                        name: 'إجمالي الإرتباطات',
                        value: result.contractsAmount
                    }
                }

                this.allTimeSpendingPerformance = {
                    target: {
                        name: 'إجمالي الإرتباطات',
                        value: result.contractsAmount
                    },
                    actual: {
                        name: 'إجمالي المنصرف',
                        value: result.totalExpenditure
                    }
                }
        })
    }
}
