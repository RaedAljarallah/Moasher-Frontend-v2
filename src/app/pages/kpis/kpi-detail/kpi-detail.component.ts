import {Component} from '@angular/core';
import {DetailComponentBase} from "../../../core/abstracts/detail-component-base";
import {IKpi} from "../core/models/kpi.model";
import {KpiCommand} from "../core/models/kpi.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from 'rxjs/operators';
import {IResponse} from "../../../core/models/response.model";
import {ITab} from "../../../shared/detail-page/detail-page.component";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-kpi-detail',
    templateUrl: './kpi-detail.component.html',
    styles: []
})
export class KpiDetailComponent extends DetailComponentBase<IKpi, KpiCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _deleteFormTitle: string = 'حذف مؤشر';
    protected _updateFormTitle: string = 'تعديل مؤشر';
    protected _modalId: string = 'KpiDetail';

    protected initCommand(): void {
        this.command = new KpiCommand(this.detailPageState!)
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IKpi[]>> {
        return this.api.get<IKpi[]>('kpis', {params: params })
    }
    public tabs: ITab[] = [
        {id: 'performance', value: 'أداء المؤشر'},
        {id: 'values', value: 'المستهدفات'},
        {id: 'analytics', value: 'التحليل'},
        {id: 'over-view', value: 'التفاصيل'},
        {id: 'documents', value: 'المستندات'}
    ];

    public isFormLoading: boolean = false;

    override update() {
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.isFormLoading = true;
        this.api.edit<KpiCommand>(`kpis/${this.detailPageState?.id}/edit`).pipe(
            finalize(() => this.isFormLoading = false)
        ).subscribe(res => {
            this.command = res.result;
            this.modal.open(this._modalId);
        })
    }
}
