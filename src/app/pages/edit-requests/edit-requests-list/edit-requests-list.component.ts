import {Component} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IEditRequest} from "../core/models/edit-request.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {EditRequestStatus} from "../../../core/models/data-types/edit-request-status.data-type";
import {EditRequestUtility} from "../../../core/utilities/edit-request.utility";
import {EditRequestType} from "../../../core/models/data-types/edit-request-type.data-type";
import {finalize} from "rxjs/operators";
import {IEditRequestDetails} from "../core/models/edit-request-details.model";
import {AppRoles} from "../../../core/services/authorize.service";

@Component({
    selector: 'app-edit-requests-list',
    templateUrl: './edit-requests-list.component.html',
    styles: []
})
export class EditRequestsListComponent extends TableComponentBase<IEditRequest, any> {

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    public isFormLoading: {[key: string]: boolean} = {};
    public editRequestDetails!: IEditRequestDetails;
    public editRequestStatus!: EditRequestStatus;
    protected _createFormTitle: string = '';
    protected _updateFormTitle: string = '';
    protected _deleteFormTitle: string = '';
    protected _modalId: string = 'EditRequestModal';
    public allowedUsers = [
        AppRoles.DataAssurance, 
        AppRoles.FinancialOperator, 
        AppRoles.ExecutionOperator, 
        AppRoles.KPIsOperator,
        AppRoles.EntityUser
    ];
    protected override onInit() {
        this.headers =[
            {value: 'رقم الطلب', classes: 'w-5'},
            {value: 'نوع الطلب', classes: 'w-5'},
            {value: 'حالة الطلب', classes: 'w-5'},
            {value: 'نطاق التغيير', classes: 'w-5'},
            {value: 'تاريخ الطلب', classes: 'w-5'},
            {value: 'بواسطة', classes: 'w-5'},
            {value: 'ملاحظات', classes: 'w-5'},
            {value: '', classes: 'w-full'}
        ];
        
        this.filterFields = [
        ]
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IEditRequest[]>> {
        return this.api.get<IEditRequest[]>('edit-requests', {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [];
    protected initCommand(item: IEditRequest | null): void {}
    
    public getTranslatedStatus(status: EditRequestStatus): string {
        return EditRequestUtility.translateStatus(status);
    }
    
    public getTranslatedType(type: EditRequestType): string {
        return EditRequestUtility.translateType(type);
    }
    
    public showDetails(item: IEditRequest): void {
        this.isFormLoading[item.id] = true;
        this.api.get<IEditRequestDetails>(`edit-requests/${item.id}`).pipe(
            finalize(() => this.isFormLoading[item.id] = false)
        ).subscribe(res => {
            this.editRequestDetails = res.result;
            this.editRequestStatus = item.status;
            this.modal.open(this._modalId);
        });
    }
    
    public editRequestHandled(item: IEditRequest): void {
        this.table.updateItem(item);
        this.modal.close(this._modalId);
    }
}
