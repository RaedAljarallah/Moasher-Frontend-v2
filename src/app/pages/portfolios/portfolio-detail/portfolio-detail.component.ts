import {Component, OnInit} from '@angular/core';
import {DetailComponentBase} from "../../../core/abstracts/detail-component-base";
import {IPortfolio} from "../core/models/portfolio.model";
import {PortfolioCommand} from "../core/models/portfolio.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {ITab} from "../../../shared/detail-page/detail-page.component";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-portfolio-detail',
    templateUrl: './portfolio-detail.component.html',
    styles: []
})
export class PortfolioDetailComponent extends DetailComponentBase<IPortfolio, PortfolioCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }
    protected _deleteFormTitle: string = 'حذف محفظة';
    protected _updateFormTitle: string = 'تعديل محفظة';
    protected _modalId: string = 'PortfolioDetail';

    protected initCommand(): void {
        this.command = new PortfolioCommand(this.detailPageState!)
    }
    
    protected loadItems(params: HttpParams): Observable<IResponse<IPortfolio[]>> {
        return this.api.get<IPortfolio[]>('portfolios', {params: params })
    }

    public tabs: ITab[] = [
        {id: 'performance', value: 'أداء المحفظة'},
        {id: 'objectives', value: 'الأهداف'},
        {id: 'programs', value: 'البرامج'},
        {id: 'initiatives', value: 'المبادرات'},
    ];

    public isFormLoading: boolean = false;

    override update() {
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.isFormLoading = true;
        this.api.edit<PortfolioCommand>(`portfolios/${this.detailPageState?.id}/edit`).pipe(
            finalize(() => this.isFormLoading = false)
        ).subscribe(res => {
            this.command = res.result;
            this.modal.open(this._modalId);
        })
    }
}
