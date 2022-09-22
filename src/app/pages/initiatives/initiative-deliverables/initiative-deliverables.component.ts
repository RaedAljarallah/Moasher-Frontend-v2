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

    protected override onInit() {
        this.command = new DeliverableCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'المخرج', classes: 'xl:min-w-[28rem]'},
            {value: 'الإنجاز المخطط', classes: 'w-28'},
            {value: 'الإنجاز الفعلي', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {name: 'مخطط من', id: 'pf', type: 'date'},
            {name: 'مخطط حتى', id: 'pt', type: 'date'},
            {name: 'منجز من', id: 'af', type: 'date'},
            {name: 'منجز حتى', id: 'at', type: 'date'},
            {name: 'مستحق حتى', id: 'du', type: 'date'},
            {
                name: 'الحالة',
                id: 'st',
                type: 'static-list',
                listPlaceholder: 'الرجاء إختيار الحالة',
                staticListItems: [
                    {name: 'منجزة', value: 'completed'},
                    {name: 'غير منجزة', value: 'uncompleted'},
                    {name: 'متأخرة', value: 'late'},
                    {name: 'مستحقة', value: 'due'}
                ]
            },
        ];
        this.summary = [
            {name: 'جميع المعالم', value: '25'},
            {name: 'منجزة', value: '25'},
            {name: 'غير منجزة', value: '25'},
            {name: 'متأخرة', value: '25'},
            {name: 'مستحقة', value: '25'},
        ];
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IDeliverable[]>> {
        return this.api.get<IDeliverable[]>(`deliverables?initiativeId=${this.initiativeId}`, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'q'},
        {key: 'pf'},
        {key: 'pt'},
        {key: 'af'},
        {key: 'at'},
        {key: 'du'},
        {key: 'st'}
    ];

    protected initCommand(item: IDeliverable | null): void {
        this.command = new DeliverableCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }
}
