import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

import {IResponse} from "../models/response.model";
import {Pagination} from "../models/pagination.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl: string;
    private params: HttpParams = new HttpParams();
    
    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiBaseUrl;
    }
    
    public get<TResult>(url: string, options?: { params?: HttpParams }) : Observable<IResponse<TResult>> {
        return this.http.get<IResponse<TResult>>(this.getCompleteUrl(url), { params: this.params }).pipe(
            map((res:IResponse<TResult>) => {
                return { result: res.result , pagination: ApiService.generatePagination(res.pagination) }
            })
        );
    }
    
    private getCompleteUrl(url: string): string {
        if (!url.startsWith('/')) {
            url = `/${url}`;
        }
        
        return `${this.baseUrl}${url}`;
    }
    
    private static generatePagination(pagination: Pagination | undefined) : Pagination | undefined {
        if (pagination) {
            const { pageSize, currentPage, totalCount } = pagination;
            let pager = new Pagination();
            pager.currentPage = currentPage;
            pager.pageSize = pageSize;
            pager.totalCount = totalCount;
            
            return pager;
        }
        
        return pagination;
    }
}
