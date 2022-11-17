import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from 'rxjs/operators';
import {IResponse} from "../../../core/models/response.model";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {IRisk} from "../core/models/risk/risk.model";
import {RiskCommand} from "../core/models/risk/risk.command";
import {AppRoles} from "../../../core/services/authorize.service";

@Component({
    selector: 'app-initiative-risks',
    templateUrl: './initiative-risks.component.html',
    styles: []
})
export class InitiativeRisksComponent extends TableComponentBase<IRisk, RiskCommand> {
    @Input() initiativeId: string = '';
    @Input() fullList: boolean = false;

    public isFormLoading: {[key: string]: boolean} = {};

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة خطر';
    protected _updateFormTitle: string = 'تعديل خطر';
    protected _deleteFormTitle: string = 'حذف خطر';
    protected _modalId: string = 'RiskModal';
    public allowedUsers = [AppRoles.ExecutionOperator, AppRoles.EntityUser];
    protected override onInit() {
        this.command = new RiskCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'وصف الخطر', classes: this.fullList ? 'w-28' : 'xl:min-w-[28rem]'},
            {value: 'نطاق الخطر', classes: 'w-28'},
            {value: 'نوع الخطر', classes: 'w-28'},
            {value: 'الأولوية', classes: 'w-28'},
            {value: 'الاحتمالية', classes: 'w-28'},
            {value: 'الأثر', classes: 'w-28'},
            {value: 'وصف الأثر', classes: 'w-28'},
            {value: 'المسؤول', classes: 'w-28'},
            {value: 'خطة الإستجابة', classes: 'w-28'},
            {value: 'رفع بتاريخ', classes: 'w-28'},
            {value: 'رفع بواسطة', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {name: 'رفع من', id: 'raisedFrom', type: 'date'},
            {name: 'رفع حتى', id: 'raisedTo', type: 'date'},
            {
                name: 'النوع',
                id: 'typeId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeRiskType}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار النوع'
            },
            {
                name: 'الأولوية',
                id: 'priorityId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeRiskPriority}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار الأولوية'
            },
            {
                name: 'الاحتمالية',
                id: 'probabilityId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeRiskProbability}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار الاحتمالية'
            },
            {
                name: 'الأثر',
                id: 'impactId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeRiskImpact}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار الأثر'
            },
            {
                name: 'النطاق',
                id: 'scopeId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeRiskScope}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار النطاق'
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

    protected loadItems(params: HttpParams): Observable<IResponse<IRisk[]>> {
        let url = 'risks';
        if (!this.fullList) {
            url = `${url}?initiativeId=${this.initiativeId}`;
        }
        return this.api.get<IRisk[]>(url, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'raisedFrom'},
        {key: 'raisedTo'},
        {key: 'typeId'},
        {key: 'priorityId'},
        {key: 'probabilityId'},
        {key: 'impactId'},
        {key: 'scopeId'},
        {key: 'entityId'},
        {key: 'initiativeId'},
    ];

    protected initCommand(item: IRisk | null): void {
        this.command = new RiskCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }

    override onUpdate(item: IRisk) {
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.isFormLoading[item.id] = true;
        this.api.edit<RiskCommand>(`risks/${item.id}/edit`).pipe(
            finalize(() => this.isFormLoading[item.id] = false)
        ).subscribe(res => {
            this.command = res.result;
            this.modal.open(this._modalId);
        })
    }
}
