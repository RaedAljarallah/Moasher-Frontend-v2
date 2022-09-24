import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Pagination} from "../../../core/models/pagination.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ApiService} from "../../../core/services/api.service";
import {IResponse} from "../../../core/models/response.model";
import * as _ from "lodash";
import {distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {IFilterOutput} from "../../../core/models/filter-output.model";
import {queryParameters} from "../../../core/constants/query-parameters.constant";

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
    @Input() type:  'static' | 'dynamic' = 'dynamic';
    @Input() staticListItems: { name: string, value: string }[] = [];
    @Input() dynamicListDefaultItems: any[] = [];
    @Input() propertyName: string = '';
    @Input() theme: string = 'theme-form-select';
    @Input() badgeTemplate: boolean = false;
    @Output() filterChanged: EventEmitter<IFilterOutput> = new EventEmitter<IFilterOutput>();
    @Output() formListChanged: EventEmitter<any> = new EventEmitter<any>();
    
    public listItems: any[] = [];
    public isListLoading: boolean = false;
    private listPagination?: Pagination;

    private listRefresh$: BehaviorSubject<{ ps: number, pn: number, q: string }>;
    private listSubscription?: Subscription
    private readonly defaultParams = { ps: 6, pn: 1, q: '' };
    
    constructor(private api: ApiService) {
        this.listRefresh$ = new BehaviorSubject<{ps: number; pn: number; q: string}>(this.defaultParams);
    }

    ngOnInit(): void {
        if (this.dynamicListDefaultItems.length) {
            this.listItems.push(...this.dynamicListDefaultItems);
        }
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
        this.listRefresh$ = new BehaviorSubject<{ps: number; pn: number; q: string}>(this.defaultParams);
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
                ps: this.listPagination.pageSize,
                pn: this.listPagination.currentPage + 1,
                q: ''
            });
        }
    }

    public searchForItem(event: {term: string, items: any[] }): void {
        if (!this.listPagination) {
            return;
        }

        if (event.items.length === 0 && event.term.length > 0) {
            this.listRefresh$.next({
                ps: this.listPagination.pageSize,
                pn: 1,
                q: event.term
            })
        }

    }

    private loadListItems(): Observable<IResponse<any[]>> {
        return this.listRefresh$.pipe(
            distinctUntilChanged(),
            tap(() => this.isListLoading = true),
            tap(() => this.control.setValue(null)),
            switchMap((params: { ps: number, pn: number, q: string }) => {
                const httpParams = new HttpParams()
                    .append(queryParameters.pageSize, params.ps)
                    .append(queryParameters.pageNumber, params.pn)
                    .append(queryParameters.search, params.q)

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
        
        this.formListChanged.emit(item);
    }
}
