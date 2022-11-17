import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IApprovedCost} from "../core/models/approved-cost/approved-cost.model";
import {ApprovedCostCommand} from "../core/models/approved-cost/approved-cost.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {AppRoles} from "../../../core/services/authorize.service";

@Component({
    selector: 'app-initiative-approved-costs',
    templateUrl: './initiative-approved-costs.component.html',
    styles: []
})
export class InitiativeApprovedCostsComponent extends TableComponentBase<IApprovedCost, ApprovedCostCommand> {
    @Input() initiativeId: string = '';

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة تكاليف معتمدة';
    protected _updateFormTitle: string = 'تعديل تكاليف معتمدة';
    protected _deleteFormTitle: string = 'حذف تكاليف معتمدة';
    protected _modalId: string = 'ApprovedCostModal';
    
    public allowedUsers = [AppRoles.FinancialOperator, AppRoles.EntityUser];
    
    protected override onInit() {
        this.command = new ApprovedCostCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'تاريخ اعتماد التكاليف', classes: 'xl:min-w-28'},
            {value: 'المبلغ (ريال)', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {name: 'معتمد من', id: 'from', type: 'date'},
            {name: 'معتمد حتى', id: 'to', type: 'date'},
        ];
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IApprovedCost[]>> {
        return this.api.get<IApprovedCost[]>(`approved-costs?initiativeId=${this.initiativeId}`, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'from'},
        {key: 'to'},
    ];

    protected initCommand(item: IApprovedCost | null): void {
        this.command = new ApprovedCostCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }
}
