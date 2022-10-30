import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IUser} from "../core/models/user.model";
import {UserCommand} from "../core/models/user.command";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent extends TableComponentBase<IUser, UserCommand> {

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    public isFormLoading: {[key: string]: boolean} = {};
    
    protected _createFormTitle: string = 'إضافة مستخدم';
    protected _updateFormTitle: string = 'تعديل مستخدم';
    protected _deleteFormTitle: string = 'حذف مستخدم';
    protected _modalId: string = 'UserModal';

    protected override onInit() {
        this.command = new UserCommand(null);
        this.headers = [
            {value: 'المستخدم', classes: 'xl:min-w-[28rem]'},
            {value: 'البريد الإلكتروني', classes: 'w-28'},
            {value: 'رقم الهاتف', classes: 'w-28'},
            {value: 'الجهة', classes: 'w-28'},
            {value: 'الصلاحية', classes: 'w-28'},
            {value: 'حالة الحساب', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        
        this.filterFields = [
            {
                name: 'الصلاحية',
                id: 'role',
                type: "dynamic-list",
                dynamicListUrl: `roles`,
                listPlaceholder: 'الرجاء إختيار اللاحية'
            },
            {
                name: 'الجهة',
                id: 'entityId',
                type: "dynamic-list",
                dynamicListUrl: `entities`,
                listPlaceholder: 'الرجاء إختيار الجهة'
            },
        ]
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IUser[]>> {
        return this.api.get<IUser[]>(`users`, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'role'},
        {key: 'entityId'},
    ];

    protected initCommand(item: IUser | null): void {
        this.command = new UserCommand(item);
        if (item) {
            this.command.id = item.id;
        }
    }

    override onUpdate(item: IUser) {
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.isFormLoading[item.id] = true;
        this.api.edit<UserCommand>(`users/${item.id}/edit`).pipe(
            finalize(() => this.isFormLoading[item.id] = false)
        ).subscribe(res => {
            this.command = res.result;
            this.modal.open(this._modalId);
        })
    }
}
