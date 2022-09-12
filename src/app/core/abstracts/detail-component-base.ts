import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {DetailPageComponent, ITab} from "../../shared/detail-page/detail-page.component";
import {FormAction} from "../models/data-types/form-action.data-type";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {ModalService} from "../../shared/modal/modal.service";
import {IResponse} from "../models/response.model";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {IKeyable} from "../models/keyable.model";

@Component({
    template: ''
})
export abstract class DetailComponentBase<TType extends IKeyable, TCommand> implements OnInit, OnDestroy {
    @ViewChild(DetailPageComponent) detailPage!: DetailPageComponent;
    public detailPageState: TType | undefined;
    public notFoundState: boolean = false;
    public command!: TCommand;
    public formAction: FormAction = FormAction.Update;
    public formTitle: string = '';
    public selectedTab: string = 'performance';

    public abstract tabs: ITab[];

    protected abstract initCommand(): void;
    protected abstract _modalId: string;
    protected abstract _updateFormTitle: string;
    protected abstract _deleteFormTitle: string;
    
    protected abstract loadItems(params: HttpParams): Observable<IResponse<TType[]>>;

    protected constructor(protected route: ActivatedRoute, protected router: Router, protected api: ApiService, protected modal: ModalService) {
        this.detailPageState = this.router.getCurrentNavigation()?.extras.state as TType;
    }

    public ngOnInit(): void {
        this.modal.register(this._modalId);
        if (!this.detailPageState) {
            this.getData(this.route.snapshot.paramMap.get('id')!).subscribe(result => this.detailPageState = result);
        }
        this.route.queryParamMap.subscribe(param => {
            this.selectedTab = param.get('s') ?? this.selectedTab;
        });
    }

    public getData(id: string): Observable<TType> {
        return this.loadItems(new HttpParams().append('id', id)).pipe(
            map(res => {
                return res.result[0]
            }),
            tap((res) => {
                if (!res) {
                    this.notFoundState = true;
                }
            })
        )
    }

    public update() {
        this.formTitle = this._updateFormTitle;
        this.initCommand()
        this.modal.open(this._modalId);
    }

    public delete() {
        this.formTitle = this._deleteFormTitle;
        this.formAction = FormAction.Delete;
        this.initCommand();
        this.modal.open(this._modalId);
    }

    public async onSubmit(item: TType): Promise<void> {
        if (this.formAction === FormAction.Update) {
            this.detailPage.updateTitle(item[this.detailPage.titleKey]);
        }

        this.modal.close(this._modalId);

        if (this.formAction === FormAction.Delete) {
            await this.detailPage.back();
        }

    }
    
    public ngOnDestroy(): void {
        this.modal.unregister(this._modalId);
    }


}