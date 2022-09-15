import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ITableHeader} from "../../../shared/table/table.component";
import {BehaviorSubject, Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {IEnumType} from "./core/models/enum-type.model";
import {v4 as guid} from 'uuid';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {UrlUtility} from "../../../core/utilities/url.utility";
import {HttpParams} from "@angular/common/http";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";

@Component({
    selector: 'app-enum-type',
    templateUrl: './enum-type.component.html',
    styles: []
})
export class EnumTypeComponent implements OnInit, OnDestroy {
    @Input() nameFieldTitle: string = 'الاسم';
    @Input() category: EnumTypeCategory = EnumTypeCategory.KPIStatus;
    public headers: ITableHeader[] = [
        {value: this.nameFieldTitle, classes: 'xl:min-w-[28rem]'},
        {value: 'اللون', classes: 'w-28'},
        {value: '', classes: 'w-full'},
    ];

    public data$: Observable<IResponse<IEnumType[]>>;
    public refresh$: BehaviorSubject<{ [k: string]: string }>;
    public _modalId: string = guid();
    
    constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private modal: ModalService) {
        this.data$ = new Observable<IResponse<IEnumType[]>>();
        this.refresh$ = new BehaviorSubject<{ [k: string]: string }>({ps: '10', pn: '1'});
    }
    
    ngOnInit(): void {
        this.modal.register(this._modalId);
        this.route.queryParams.subscribe((params: Params) => {
            this.refresh$.next({
                ps: params['ps'] ?? '10',
                pn: params['pn'] ?? '1',
            });
            this.data$ = this.getDate(this.refresh$);
        });
    }

    public ngOnDestroy(): void {
        this.modal.unregister(this._modalId);
    }

    public getDate(refresh$: BehaviorSubject<{ [k: string]: string }>): Observable<IResponse<IEnumType[]>> {
        return refresh$.pipe(
            distinctUntilChanged(),
            map((params: { [k: string]: string }) => {
                return UrlUtility.getHttpParams(params);
            }),
            switchMap((params: HttpParams) => {
                return this.api.get<IEnumType[]>(`enum-types?category=${this.category}`, {params: params});
            })
        )
    }
}
