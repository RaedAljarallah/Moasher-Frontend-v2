import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {IIdentifiable} from "../models/identifiable.model";
import {ITableBreadcrumb, ITableHeader, TableComponent} from "../../shared/table/table.component";
import {IFilter} from "../models/filter.model";
import {BehaviorSubject, Observable} from "rxjs";
import {IResponse} from "../models/response.model";
import {FormAction} from "../models/data-types/form-action.data-type";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {ModalService} from "../../shared/modal/modal.service";
import {distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {UrlUtility} from "../utilities/url.utility";
import {queryParameters} from "../constants/query-parameters.constant";

@Component({
    template: ''
})
export abstract class TableComponentBase<TType extends IIdentifiable, TCommand> implements OnInit, OnDestroy {
    @Input() subList: boolean = false;
    @Input() withPagination: boolean = true;
    @ViewChild(TableComponent) table!: TableComponent;

    public command!: TCommand;
    public formAction: FormAction = FormAction.Create;
    public formTitle: string = '';
    public headers: ITableHeader[] = [];
    public filterFields: IFilter[] = [];
    public summary: ITableBreadcrumb[] = [];
    public data$: Observable<IResponse<TType[]>>;
    public refresh$: BehaviorSubject<{ [k: string]: string }>;

    protected abstract initCommand(item: TType | null): void;

    protected abstract _modalId: string;
    protected abstract _updateFormTitle: string;
    protected abstract _deleteFormTitle: string;
    protected abstract _createFormTitle: string;
    protected abstract queryParams: { key: string, defaultValue?: string }[];
    
    public abstract allowedUsers: string[];
    
    protected abstract loadItems(params: HttpParams): Observable<IResponse<TType[]>>;

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
            [queryParameters.pageNumber]: params['pn'] ?? '1',
            [queryParameters.search]: params['q'] ?? undefined
        };

        for (let qp of this.queryParams) {
            queryParams[qp.key] = params[qp.key] ?? qp.defaultValue
        }

        return queryParams;
    }

    protected onInit(): void {
    }

    public onCreate(): void {
        this.initCommand(null);
        this.formTitle = this._createFormTitle;
        this.formAction = FormAction.Create;
        this.modal.open(this._modalId);
    }

    public onDelete(item: TType): void {
        this.initCommand(item);
        this.formTitle = this._deleteFormTitle;
        this.formAction = FormAction.Delete;
        this.modal.open(this._modalId);
    }

    public onUpdate(item: TType): void {
        this.initCommand(item);
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.modal.open(this._modalId);
    }

    public updateItems(item: TType): void {
        if (this.formAction === FormAction.Create) {
            this.table.addItem(item);
        }

        if (this.formAction === FormAction.Delete) {
            this.table.deleteItem(item.id);
        }

        if (this.formAction === FormAction.Update) {
            this.table.updateItem(item);
        }

        this.modal.close(this._modalId);
    }

    public ngOnDestroy(): void {
        this.modal.unregister(this._modalId);
        this.onDestroy();
    }
    
    public onDestroy(): void {}
}