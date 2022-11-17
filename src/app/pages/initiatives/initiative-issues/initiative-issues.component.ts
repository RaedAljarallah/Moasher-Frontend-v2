import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IIssue} from "../core/models/issue/issue.model";
import {IssueCommand} from "../core/models/issue/issue.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from 'rxjs/operators';
import {IResponse} from "../../../core/models/response.model";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";
import {AppRoles} from "../../../core/services/authorize.service";

@Component({
    selector: 'app-initiative-issues',
    templateUrl: './initiative-issues.component.html',
    styles: []
})
export class InitiativeIssuesComponent extends TableComponentBase<IIssue, IssueCommand> {
    @Input() initiativeId: string = '';
    @Input() fullList: boolean = false;

    public isFormLoading: {[key: string]: boolean} = {};

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة معوق';
    protected _updateFormTitle: string = 'تعديل معوق';
    protected _deleteFormTitle: string = 'حذف معوق';
    protected _modalId: string = 'IssueModal';
    public allowedUsers = [AppRoles.ExecutionOperator, AppRoles.EntityUser];
    protected override onInit() {
        this.command = new IssueCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'وصف المعوق', classes: this.fullList ? 'w-28' : 'xl:min-w-[28rem]'},
            {value: 'نطاق المعوق', classes: 'w-28'},
            {value: 'الحالة', classes: 'w-28'},
            {value: 'الأثر', classes: 'w-28'},
            {value: 'وصف الأثر', classes: 'w-28'},
            {value: 'مصدر المعوق', classes: 'w-28'},
            {value: 'سبب المعوق', classes: 'w-28'},
            {value: 'الحل المقترح', classes: 'w-28'},
            {value: 'تاريخ الحل المتوقع', classes: 'w-28'},
            {value: 'رفع بتاريخ', classes: 'w-28'},
            {value: 'رفع بواسطة', classes: 'w-28'},
            {value: 'أغلق بتاريخ', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {name: 'رفع من', id: 'raisedFrom', type: 'date'},
            {name: 'رفع حتى', id: 'raisedTo', type: 'date'},
            {name: 'أغلق حتى', id: 'closedFrom', type: 'date'},
            {name: 'أغلق حتى', id: 'closedTo', type: 'date'},
            {
                name: 'النطاق',
                id: 'scopeId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeIssueScope}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار النطاق'
            },
            {
                name: 'الأثر',
                id: 'impactId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeIssueImpact}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار الأثر'
            },
            {
                name: 'الحالة',
                id: 'statusId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeIssueStatus}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار الحالة'
            },
        ];

        if (this.fullList) {
            this.headers.unshift(...[
                {value: 'المبادرة', classes: 'xl:min-w-[28rem]'},
                {value: 'الجهة', classes: 'w-28'}
            ]);

            this.filterFields.unshift(
                {
                    name: 'الجهة',
                    id: 'entityId',
                    type: "dynamic-list",
                    dynamicListUrl: 'entities',
                    listPlaceholder: 'الرجاء إختيار الجهة'
                },
                {
                    name: 'المبادرة',
                    id: 'initiativeId',
                    type: "dynamic-list",
                    dynamicListUrl: 'initiatives',
                    listPlaceholder: 'الرجاء إختيار المبادرة'
                }
            );
        }
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IIssue[]>> {
        let url = 'issues';
        if (!this.fullList) {
            url = `${url}?initiativeId=${this.initiativeId}`;
        }
        return this.api.get<IIssue[]>(url, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'raisedFrom'},
        {key: 'raisedTo'},
        {key: 'closedFrom'},
        {key: 'closedTo'},
        {key: 'scopeId'},
        {key: 'impactId'},
        {key: 'statusId'},
        {key: 'entityId'},
        {key: 'initiativeId'},
    ];

    protected initCommand(item: IIssue | null): void {
        this.command = new IssueCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }

    public override onUpdate(item: IIssue) {
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.isFormLoading[item.id] = true;
        this.api.edit<IssueCommand>(`issues/${item.id}/edit`).pipe(
            finalize(() => this.isFormLoading[item.id] = false)
        ).subscribe(res => {
            this.command = res.result;
            this.modal.open(this._modalId);
        })
    }
}
