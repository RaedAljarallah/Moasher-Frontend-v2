import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CollectionComponent} from "../../shared/collection/collection.component";
import {BehaviorSubject, Observable} from "rxjs";
import {IResponse} from "../models/response.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {ModalService} from "../../shared/modal/modal.service";
import {distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {IIdentifiable} from "../models/identifiable.model";
import {UrlUtility} from "../utilities/url.utility";
import {IFilter} from "../models/filter.model";
import {queryParameters} from "../constants/query-parameters.constant";

@Component({
    template: ''
})
export abstract class ListComponentBase<TType extends IIdentifiable, TCommand> implements OnInit, OnDestroy {
    @Input() subList: boolean = false;
    @ViewChild(CollectionComponent) collection!: CollectionComponent;
    public data$: Observable<IResponse<TType[]>>;
    public refresh$: BehaviorSubject<{ [k: string]: string }>;
    public filterFields: IFilter[] = [];
    protected abstract _url: string;
    protected abstract _modalId: string;
    protected abstract queryParams: { key: string, defaultValue?: string }[];
    public abstract command: TCommand;

    protected abstract loadItems(params: HttpParams): Observable<IResponse<TType[]>>

    protected constructor(protected route: ActivatedRoute, protected router: Router,
                          protected api: ApiService, protected modal: ModalService) {

        this.data$ = new Observable<IResponse<TType[]>>();
        this.refresh$ = new BehaviorSubject<{ [k: string]: string }>({
            [queryParameters.pageSize]: '10',
            [queryParameters.pageNumber]: '1'
        });
    }

    public ngOnInit(): void {
        this.modal.register(this._modalId);
        this.route.queryParams.subscribe((params: Params) => {
            this.refresh$.next(this.getQueryParams(params));
            this.data$ = this.getDate(this.refresh$);
        });
        this.onInit();
    }

    public async showDetail(item: TType): Promise<void> {
        await this.router.navigateByUrl(`${this._url}/${item.id}`, {state: {item: item, returnUrl: this.router.url}})
    }

    public onCreate(): void {
        this.modal.open(this._modalId);
    }

    public updateItems(item: TType): void {
        this.collection.addItem(item);
        this.modal.close(this._modalId);
    }

    public ngOnDestroy(): void {
        this.modal.unregister(this._modalId);
    }

    protected onInit(): void {
    }

    private getDate(refresh$: BehaviorSubject<{ [k: string]: string }>): Observable<IResponse<TType[]>> {
        return refresh$.pipe(
            distinctUntilChanged((previous: any, current: any) => {
                return previous !== current;
            }),
            map((params: { [k: string]: string }) => {
                return UrlUtility.getHttpParams(params);
            }),
            switchMap((params: HttpParams) => {
                return this.loadItems(params);
            })
        )
    }

    private getQueryParams(params: Params): { [key: string]: string } {
        let queryParams: { [key: string]: string } = {
            [queryParameters.pageSize]: params['ps'] ?? '10',
            [queryParameters.pageNumber]: params['pn'] ?? '1'
        };

        for (let qp of this.queryParams) {
            queryParams[qp.key] = params[qp.key] ?? qp.defaultValue
        }

        return queryParams;
    }
}