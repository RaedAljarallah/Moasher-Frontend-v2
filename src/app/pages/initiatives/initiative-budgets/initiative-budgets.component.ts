import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IBudget} from "../core/models/budget/budget.model";
import {BudgetCommand} from "../core/models/budget/budget.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";


@Component({
    selector: 'app-initiative-budgets',
    templateUrl: './initiative-budgets.component.html',
    styles: []
})
export class InitiativeBudgetsComponent extends TableComponentBase<IBudget, BudgetCommand> {
    @Input() initiativeId: string = '';

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة تكاليف معتمدة';
    protected _updateFormTitle: string = 'تعديل تكاليف معتمدة';
    protected _deleteFormTitle: string = 'حذف تكاليف معتمدة';
    protected _modalId: string = 'BudgetModal';

    protected override onInit() {
        this.command = new BudgetCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'تاريخ اعتماد الميزانية', classes: 'xl:min-w-28'},
            {value: 'الميزانية الأصلية (ريال)', classes: 'w-28'},
            {value: 'الميزانية بعد التعديل (ريال)', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {name: 'معتمد من', id: 'from', type: 'date'},
            {name: 'معتمد حتى', id: 'to', type: 'date'},
        ];
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IBudget[]>> {
        return this.api.get<IBudget[]>(`budgets?initiativeId=${this.initiativeId}`, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'q'},
        {key: 'from'},
        {key: 'to'},
    ];

    protected initCommand(item: IBudget | null): void {
        this.command = new BudgetCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }
}
