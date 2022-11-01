import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {map, catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {IResponse} from "../models/response.model";
import {Pagination} from "../models/pagination.model";
import {IResponseError} from "../models/response-error.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl: string;
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    })

    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiBaseUrl;
    }

    public get<TResult>(url: string, options?: { params?: HttpParams }): Observable<IResponse<TResult>> {
        return this.http.get<IResponse<TResult>>(this.getCompleteUrl(url), {params: options?.params}).pipe(
            map((res: any) => {
                if (res.hasOwnProperty('result')) {
                    return {result: res.result, pagination: this.generatePagination(res.pagination)}
                }
                return {result: res }
            })
        );
    }
    
    public edit<TResult>(url: string, options?: { params?: HttpParams }): Observable<IResponse<TResult>> {
        return this.http.get<TResult>(this.getCompleteUrl(url), {params: options?.params}).pipe(
            map((res: TResult) => {
                return { result: res }
            })
        );
    }
    
    public post<TRequest, TResponse>(url: string, request: TRequest, options?: { params?: HttpParams }): Observable<IResponse<TResponse>> {
        return this.http.post<TResponse>(this.getCompleteUrl(url), request, {
            headers: this.headers,
            params: options?.params
        })
            .pipe(
                catchError(failure => {
                    return throwError(() => this.getResponseError(failure))
                }),
                map((res: TResponse) => {
                    return {result: res}
                })
            );
    }

    public put<TRequest, TResponse>(url: string, request: TRequest, options?: { params?: HttpParams }): Observable<IResponse<TResponse>> {
        return this.http.put<TResponse>(this.getCompleteUrl(url), request, {
            headers: this.headers,
            params: options?.params
        }).pipe(
            catchError(failure => {
                return throwError(() => this.getResponseError(failure))
            }),
            map((res: TResponse) => {
                return {result: res}
            })
        );
    }

    public delete(url: string, options?: { params?: HttpParams }): Observable<IResponse<any>> {
        return this.http.delete<any>(this.getCompleteUrl(url), {
            headers: this.headers,
            params: options?.params
        }).pipe(
            catchError(failure => {
                return throwError(() => this.getResponseError(failure))
            }),
            map((res: any) => {
                return {result: undefined}
            })
        );

    }

    private getCompleteUrl(url: string): string {
        if (!url.startsWith('/')) {
            url = `/${url}`;
        }

        return `${this.baseUrl}${url}`;
    }

    private generatePagination(pagination: Pagination | undefined): Pagination | undefined {
        if (pagination) {
            const {pageSize, currentPage, totalCount} = pagination;
            let pager = new Pagination();
            pager.currentPage = currentPage;
            pager.pageSize = pageSize;
            pager.totalCount = totalCount;

            return pager;
        }

        return pagination;
    }

    private getResponseError(failure: any): IResponseError {
        console.error(failure);
        let errors: IResponseError;
        switch (failure.status) {
            case 400:
                errors = {statusCode: 400, errors: failure.error.errors};
                break;
            case 409:
                errors = {statusCode: 409, errors: {'': [failure.error.detail ?? this.getGenericErrorMessage(409)] }};
                break;
            default:
                errors = {statusCode: 500, errors: {'': [this.getGenericErrorMessage(failure.status || 500)]}}
        }

        return errors;
    }
    
    private getGenericErrorMessage(statusCode: number): string {
        return `لا يمكن إتمام العملية, رمز الخطأ (${statusCode})`;
    }
}
