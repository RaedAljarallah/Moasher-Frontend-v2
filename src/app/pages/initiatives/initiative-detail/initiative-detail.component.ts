import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {finalize, Observable} from "rxjs";
import {ITab} from "../../../shared/detail-page/detail-page.component";
import {IInitiative} from "../core/models/initiative.model";
import {ApiService} from "../../../core/services/api.service";
import {HttpParams} from "@angular/common/http";
import {ModalService} from "../../../shared/modal/modal.service";
import {InitiativeCommand} from "../core/models/initiative.command";
import {DetailComponentBase} from "../../../core/abstracts/detail-component-base";
import {IResponse} from "../../../core/models/response.model";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-initiative-detail',
    templateUrl: './initiative-detail.component.html'
})
export class InitiativeDetailComponent extends DetailComponentBase<IInitiative, InitiativeCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }
    
    protected _deleteFormTitle: string = 'حذف مبادرة';
    protected _updateFormTitle: string = 'تعديل مبادرة';
    protected _modalId: string = 'InitiativeDetail';

    protected initCommand(): void {
        this.command = new InitiativeCommand(this.detailPageState!)
    }
    
    protected loadItems(params: HttpParams): Observable<IResponse<IInitiative[]>> {
        return this.api.get<IInitiative[]>('initiatives', {params: params })
    }

    public tabs: ITab[] = [
        {id: 'performance', value: 'أداء المبادرة'},
        {id: 'issues', value: 'المعوقات'},
        {id: 'risks', value: 'المخاطر'},
        {id: 'milestones', value: 'المعالم'},
        {id: 'deliverables', value: 'المخرجات'},
        {id: 'approved-costs', value: 'التكاليف المعتمدة'},
        {id: 'projects', value: 'المشاريع'},
        {id: 'contracts', value: 'العقود'},
        {id: 'budgets', value: 'الميزانيات'},
        {id: 'expenditures', value: 'المصروفات'},
        {id: 'analytics', value: 'التحليل'},
        {id: 'teams', value: 'الفريق'},
        {id: 'over-view', value: 'التفاصيل'},
        {id: 'documents', value: 'المستندات'}
    ];

    public isFormLoading: boolean = false;
    
    override update() {
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.isFormLoading = true;
        this.api.edit<InitiativeCommand>(`initiatives/${this.detailPageState?.id}/edit`).pipe(
            finalize(() => this.isFormLoading = false)
        ).subscribe(res => {
            this.command = res.result;
            this.modal.open(this._modalId);
        })
    }
}
