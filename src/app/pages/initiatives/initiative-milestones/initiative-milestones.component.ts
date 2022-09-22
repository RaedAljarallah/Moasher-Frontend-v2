import {Component, Input} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {IMilestone} from "../core/models/milestone/milestone.model";
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {MilestoneCommand} from "../core/models/milestone/milestone.command";

@Component({
    selector: 'app-initiative-milestones',
    templateUrl: './initiative-milestones.component.html',
    styles: []
})
export class InitiativeMilestonesComponent extends TableComponentBase<IMilestone, MilestoneCommand> {
    @Input() initiativeId: string = '';

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة معلم';
    protected _updateFormTitle: string = 'تعديل معلم';
    protected _deleteFormTitle: string = 'حذف معلم';
    protected _modalId: string = 'MilestoneModal';

    protected override onInit() {
        this.command = new MilestoneCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'المعلم', classes: 'xl:min-w-[28rem]'},
            {value: 'الوزن', classes: 'w-5'},
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

    protected loadItems(params: HttpParams): Observable<IResponse<IMilestone[]>> {
        return this.api.get<IMilestone[]>(`milestones?initiativeId=${this.initiativeId}`, {params: params});
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

    protected initCommand(item: IMilestone | null): void {
        this.command = new MilestoneCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }
}
