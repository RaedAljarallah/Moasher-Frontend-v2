import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Pagination} from "../../../core/models/pagination.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ApiService} from "../../../core/services/api.service";
import {IResponse} from "../../../core/models/response.model";
import * as _ from "lodash";
import {distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {IFilterOutput} from "../../../core/models/filter-output.model";

@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html',
    styles: []
})
export class SelectListComponent implements OnInit {
    @Input() control: FormControl = new FormControl();
    @Input() placeholder: string = '';
    @Input() id: string = '';
    @Input() listUrl: string = '';
    @Input() propertyName: string = '';
    @Input() theme: string = 'theme-form-select';
    @Output() filterChanged: EventEmitter<IFilterOutput> = new EventEmitter<IFilterOutput>();
    
    public listItems: any[] = [];
    public isListLoading: boolean = false;
    private listPagination?: Pagination;

    private listRefresh$: BehaviorSubject<{ pageSize: number, pageNumber: number, searchQuery: string }>;
    private listSubscription?: Subscription
    private readonly defaultParams = { pageSize: 6, pageNumber: 1, searchQuery: '' };
    
    constructor(private api: ApiService) {
        this.listRefresh$ = new BehaviorSubject<{pageSize: number; pageNumber: number; searchQuery: string}>(this.defaultParams);
    }

    ngOnInit(): void {
    }

    public getListItems(): void {
        this.listSubscription = this.loadListItems().subscribe((res: IResponse<any[]>) => {
            this.listItems = this.listItems.concat(res.result);
            this.listItems = _.uniqBy(this.listItems, 'id');
            this.listPagination = res.pagination;
        });
        document.querySelector('form')?.classList.remove('overflow-hidden');

    }

    public resetList(): void {
        this.listSubscription?.unsubscribe();
        this.listRefresh$ = new BehaviorSubject<{pageSize: number; pageNumber: number; searchQuery: string}>(this.defaultParams);
        this.listItems = [];
        this.isListLoading = false;
        this.listPagination = undefined;
        document.querySelector('form')?.classList.add('overflow-hidden');
    }

    public getMoreListItems(): void {
        if (!this.listPagination) {
            return;
        }

        if (this.listPagination.currentPage < this.listPagination.totalPages) {
            this.listRefresh$.next({
                pageSize: this.listPagination.pageSize,
                pageNumber: this.listPagination.currentPage + 1,
                searchQuery: ''
            });
        }
    }

    public searchForItem(event: {term: string, items: any[] }): void {
        if (!this.listPagination) {
            return;
        }

        if (event.items.length === 0 && event.term.length > 0) {
            console.log(event.term);
            this.listRefresh$.next({
                pageSize: this.listPagination.pageSize,
                pageNumber: 1,
                searchQuery: event.term
            })
        }

    }

    private loadListItems(): Observable<IResponse<any[]>> {
        return this.listRefresh$.pipe(
            distinctUntilChanged(),
            tap(() => this.isListLoading = true),
            tap(() => this.control.setValue(null)),
            switchMap((params: { pageSize: number, pageNumber: number, searchQuery: string }) => {
                const httpParams = new HttpParams()
                    .append('pageSize', params.pageSize)
                    .append('pageNumber', params.pageNumber)
                    .append('searchQuery', params.searchQuery)

                return this.api.get<any[]>(this.listUrl, { params: httpParams })
            }),
            tap(() => this.isListLoading = false)
        );
    }
    
    public selectItem(item: any) {
        if (this.propertyName.length > 0) {
            if (item) {
                this.filterChanged.emit({ param: this.propertyName, value: item['id'] });
            } else {
                this.filterChanged.emit({ param: this.propertyName, value: undefined });
            }
            
        }
    }
}
