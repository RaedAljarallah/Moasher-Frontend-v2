import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IContract} from "../core/models/contract/contract.model";
import {ContractCommand} from "../core/models/contract/contract.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {DateUtility} from "../../../core/utilities/date.utility";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from 'rxjs/operators';
import {IResponse} from "../../../core/models/response.model";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {AppRoles} from "../../../core/services/authorize.service";

@Component({
    selector: 'app-initiative-contracts',
    templateUrl: './initiative-contracts.component.html',
    styles: []
})
export class InitiativeContractsComponent extends TableComponentBase<IContract, ContractCommand> {
    @Input() initiativeId: string = '';
    public isFormLoading: {[key: string]: boolean} = {};

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة عقد';
    protected _updateFormTitle: string = 'تعديل عقد';
    protected _deleteFormTitle: string = 'حذف عقد';
    protected _modalId: string = 'ContractModal';
    public allowedUsers = [AppRoles.FinancialOperator, AppRoles.EntityUser];
    protected override onInit() {
        this.command = new ContractCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'العقد', classes: 'xl:min-w-[28rem]'},
            {value: 'الحالة', classes: 'w-28'},
            {value: 'تاريخ بداية العقد', classes: 'w-28'},
            {value: 'تاريخ نهاية العقد', classes: 'w-28'},
            {value: 'قيمة العقد', classes: 'w-28'},
            {value: `منصرف سنة ${DateUtility.getCurrentYear()}`, classes: 'w-28'},
            {value: 'مخطط الصرف حتى تاريخه', classes: 'w-28'},
            {value: 'إجمالي المنصرف حتى تاريخة', classes: 'w-28'},
            {value: 'المتبقي', classes: 'w-28'},
            {value: 'حالة خطة الصرف', classes: 'w-28'},
            {value: 'الرقم المرجعي', classes: 'w-28'},
            {value: 'المورد', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {name: 'بداية العقد من', id: 'startFrom', type: 'date'},
            {name: 'بداية العقد حتى', id: 'startTo', type: 'date'},
            {name: 'نهاية العقد من', id: 'endFrom', type: 'date'},
            {name: 'نهاية العقد حتى', id: 'endTo', type: 'date'},
            {
                name: 'الحالة',
                id: 'statusId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeContractStatus}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار الحالة'
            },
            {
                name: 'حالة خطة الصرف',
                id: 'expenditurePlanStatus',
                type: 'static-list',
                listPlaceholder: 'الرجاء إختيار حالة خطة الصرف',
                staticListItems: [
                    {name: 'مطابقة', value: 'matching'},
                    {name: 'غير مطابقة', value: 'notMatching'}
                ]
            }
        ];
        this.summary = [];
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IContract[]>> {
        return this.api.get<IContract[]>(`contracts?initiativeId=${this.initiativeId}`, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'startFrom'},
        {key: 'startTo'},
        {key: 'endFrom'},
        {key: 'endTo'},
        {key: 'statusId'},
        {key: 'expenditurePlanStatus'}
    ];

    protected initCommand(item: IContract | null): void {
        this.command = new ContractCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }

    public override onUpdate(item: IContract) {
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.isFormLoading[item.id] = true;
        this.api.edit<ContractCommand>(`contracts/${item.id}/edit`).pipe(
            finalize(() => this.isFormLoading[item.id] = false)
        ).subscribe(res => {
            this.command = res.result;
            this.modal.open(this._modalId);
        })
    }
}
