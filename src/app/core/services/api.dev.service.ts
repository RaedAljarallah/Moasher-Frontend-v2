import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {IResponse} from "../models/response.model";
import {map,delay} from "rxjs/operators";
import {Pagination} from "../models/pagination.model";
import {IInitiativeFinancialSummaryChart} from "../../shared/charts/models/initiative-financial-summary-chart.model";

@Injectable({
    providedIn: 'root'
})
export class ApiDevService {
    private readonly baseUrl: string;
    private params: HttpParams = new HttpParams();
    
    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiBaseUrl;
    }

    public get<TResult>(url: string, options?: { params?: HttpParams }) : Observable<IResponse<TResult>> {
        return this.http.get<any>(this.baseUrl, { params: this.params }).pipe(
            delay(1000),
            map((res: any) => {
                if(url.includes('initiatives/summary')) {
                    return {
                        result: this.getInitiativeSummary()
                    }
                }
                if (url.includes('milestones')) {
                    url = 'milestones';
                }
                let data = res[url];
                let sq = options?.params?.get('q');
                console.log(sq);
                let pagination = new Pagination();
                pagination.totalCount = data.length;
                pagination.currentPage = parseInt(options?.params?.get('pn') ?? '1');
                pagination.pageSize = parseInt(options?.params?.get('ps') ?? '10');

                if (sq && sq.length > 0) {
                    data = data.filter((d: any) => d['name'].includes(sq))
                }
                
                let id = options?.params?.get('id');
                if (id) {
                    return {
                        result: data.find((d: any) => d['id'] === id)
                    }
                }
                return { 
                    result: data.slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize),
                    pagination: pagination 
                }
            })
        );
    }
    
    private getInitiativeSummary(): IInitiativeFinancialSummaryChart {
        return {
            statuses: [
                {
                    name: 'على المسار',
                    style: 'enum-value-1'
                }
            ],
            fundStatuses: [],
            plannedProgress: 30,
            actualProgress: 25,
            requiredCost: 1000000,
            approvedCost: 100000,
            currentYearBudget: 3000,
            totalBudget: 50000,
            contractsAmount: 2300,
            totalExpenditure: 2300,
            currentYearExpenditure: 2300
        }
    }
}
