import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IDeliverable} from "../core/models/deliverable/deliverable.model";
import {DeliverableCommand} from "../core/models/deliverable/deliverable.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {
    schedulableFilterFields,
    schedulableQueryParameters
} from "../../../core/constants/schedulable-query-parameters";
import {AppRoles} from "../../../core/services/authorize.service";


@Component({
    selector: 'app-initiative-deliverables',
    templateUrl: './initiative-deliverables.component.html',
    styles: []
})
export class InitiativeDeliverablesComponent extends TableComponentBase<IDeliverable, DeliverableCommand> {
    @Input() initiativeId: string = '';

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة مخرج';
    protected _updateFormTitle: string = 'تعديل مخرج';
    protected _deleteFormTitle: string = 'حذف مخرج';
    protected _modalId: string = 'DeliverableModal';
    public allowedUsers = [AppRoles.ExecutionOperator, AppRoles.EntityUser];
    protected override onInit() {
        this.command = new DeliverableCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'المخرج', classes: 'xl:min-w-[28rem]'},
            {value: 'الإنجاز المخطط', classes: 'w-28'},
            {value: 'الإنجاز الفعلي', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = schedulableFilterFields;
        this.summary = [];
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IDeliverable[]>> {
        return this.api.get<IDeliverable[]>(`deliverables?initiativeId=${this.initiativeId}`, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = schedulableQueryParameters;

    protected initCommand(item: IDeliverable | null): void {
        this.command = new DeliverableCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }
}
