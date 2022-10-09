import {Component, Input, OnInit} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IProject} from "../core/models/project/project.model";
import {ProjectCommand} from "../core/models/project/project.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";

@Component({
    selector: 'app-initiative-projects',
    templateUrl: './initiative-projects.component.html',
    styles: []
})
export class InitiativeProjectsComponent extends TableComponentBase<IProject, ProjectCommand>{
    @Input() initiativeId: string = '';
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة مشروع';
    protected _updateFormTitle: string = 'تعديل مشروع';
    protected _deleteFormTitle: string = 'حذف مشروع';
    protected _modalId: string = 'ProjectModal';

    protected override onInit() {
        this.command = new ProjectCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'المشروع', classes: 'xl:min-w-[28rem]'},
            {value: 'المرحلة', classes: 'w-28'},
            {value: 'تاريخ الطرح المخطط', classes: 'w-28'},
            {value: 'تاريخ الطرح الفعلي', classes: 'w-28'},
            {value: 'تاريخ التعاقد المخطط', classes: 'w-28'},
            {value: 'القيمة التقديرية', classes: 'w-28'},
            {value: 'مدة المشروع (شهر)', classes: 'w-28'},
            {value: 'الحالة', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {name: 'مخطط للطرح من', id: 'raisedFrom', type: 'date'},
            {name: 'مخطط للطرح حتى', id: 'raisedFrom', type: 'date'},
            {name: 'طرح من', id: 'raisedFrom', type: 'date'},
            {name: 'طرح حتى', id: 'raisedFrom', type: 'date'},
            {
                name: 'المرحلة',
                id: 'phaseId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeProjectPhase}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار المرحلة'
            },
            {
                name: 'الحالة',
                id: 'status',
                type: 'static-list',
                listPlaceholder: 'الرجاء إختيار الحالة',
                staticListItems: [
                    {name: 'على المسار', value: 'ontrack'},
                    {name: 'متأخر في الطرح', value: 'lateOnBidding'},
                    {name: 'متأخر في التعاقد', value: 'lateOnContracting'}
                ]
            }
        ];
        this.summary = [];
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IProject[]>> {
        return this.api.get<IProject[]>(`projects?initiativeId=${this.initiativeId}`, {params: params});
    }
    protected queryParams: { key: string; defaultValue?: string }[] = [];

    protected initCommand(item: IProject | null): void {
        this.command = new ProjectCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }
}
