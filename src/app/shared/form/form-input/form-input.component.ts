import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {IResponse} from "../../../core/models/response.model";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {distinctUntilChanged, tap, switchMap, map, delay} from "rxjs/operators";
import {Pagination} from "../../../core/models/pagination.model";
import * as _ from 'lodash';
import {ApiService} from "../../../core/services/api.service";

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.html',
    
})
export class FormInputComponent implements OnInit {
    @Input() control: FormControl = new FormControl();
    @Input() type: 'text' | 'email' | 'password' | 'date' | 'list' | 'textarea' | 'checkbox' = 'text';
    @Input() placeholder: string = '';
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() listUrl: string = '';
    
    // public listItems: any[] = [];
    // public isListLoading: boolean = false;
    // private listPagination?: Pagination;
    //
    // private listRefresh$: BehaviorSubject<{ pageSize: number, pageNumber: number, searchQuery: string }>;
    // private listSubscription?: Subscription
    // private readonly defaultParams = { pageSize: 6, pageNumber: 1, searchQuery: '' };
    
    constructor(private api: ApiService) {
        //this.listRefresh$ = new BehaviorSubject<{pageSize: number; pageNumber: number; searchQuery: string}>(this.defaultParams);
    }

    ngOnInit(): void {
    }
    
    // public getListItems(): void {
    //     this.listSubscription = this.loadListItems().subscribe((res: IResponse<any[]>) => {
    //         this.listItems = this.listItems.concat(res.result);
    //         this.listItems = _.uniqBy(this.listItems, 'id');
    //         this.listPagination = res.pagination;
    //     });
    //     document.querySelector('form')?.classList.remove('overflow-hidden');
    //
    // }
    //
    // public resetList(): void {
    //     this.listSubscription?.unsubscribe();
    //     this.listRefresh$ = new BehaviorSubject<{pageSize: number; pageNumber: number; searchQuery: string}>(this.defaultParams);
    //     this.listItems = [];
    //     this.isListLoading = false;
    //     this.listPagination = undefined;
    //     document.querySelector('form')?.classList.add('overflow-hidden');
    // }
    //
    // public getMoreListItems(): void {
    //     if (!this.listPagination) {
    //         return;
    //     }
    //    
    //     if (this.listPagination.currentPage < this.listPagination.totalPages) {
    //         this.listRefresh$.next({
    //             pageSize: this.listPagination.pageSize,
    //             pageNumber: this.listPagination.currentPage + 1,
    //             searchQuery: ''
    //         });
    //     }
    // }
    //
    // public searchFromItem(event: {term: string, items: any[] }): void {
    //     if (!this.listPagination) {
    //         return;
    //     }
    //    
    //     if (event.items.length === 0 && event.term.length > 0) {
    //         console.log(event.term);
    //         this.listRefresh$.next({
    //             pageSize: this.listPagination.pageSize,
    //             pageNumber: 1,
    //             searchQuery: event.term
    //         })
    //     }
    //    
    // }
    //
    // private loadListItems(): Observable<IResponse<any[]>> {
    //     return this.listRefresh$.pipe(
    //         distinctUntilChanged(),
    //         tap(() => this.isListLoading = true),
    //         tap(() => this.control.setValue(null)),
    //         switchMap((params: { pageSize: number, pageNumber: number, searchQuery: string }) => {
    //             const httpParams = new HttpParams()
    //                 .append('pageSize', params.pageSize)
    //                 .append('pageNumber', params.pageNumber)
    //                 .append('searchQuery', params.searchQuery)
    //            
    //             return this.api.get<any[]>(this.listUrl, { params: httpParams })
    //         }),
    //         tap(() => this.isListLoading = false)
    //     );
    // }
}
