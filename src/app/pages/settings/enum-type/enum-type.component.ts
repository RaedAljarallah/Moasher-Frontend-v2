import {Component, Input} from '@angular/core';
import {ITableHeader} from "../../../shared/table/table.component";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {IEnumType} from "./core/models/enum-type.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {EnumTypeCommand} from "./core/models/enum-type.command";
import {AppRoles} from "../../../core/services/authorize.service";

@Component({
    selector: 'app-enum-type',
    templateUrl: './enum-type.component.html',
    styles: []
})
export class EnumTypeComponent extends TableComponentBase<IEnumType, EnumTypeCommand> {
    @Input() category: EnumTypeCategory = EnumTypeCategory.KPIStatus;
    @Input() nameFieldTitle: string = 'الاسم';
    @Input() override headers: ITableHeader[] = [];
    @Input() withMetadata: boolean = false;
    
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }
    
    
    protected _createFormTitle: string = '';
    protected _deleteFormTitle: string = '';
    protected _updateFormTitle: string = '';
    protected _modalId: string = 'EnumTypeModal';
    public allowedUsers = [];
    protected override onInit() {
        this.headers[0].value = this.nameFieldTitle;
        this._createFormTitle = `إضافة ${this.nameFieldTitle}`;
        this._deleteFormTitle = `حذف ${this.nameFieldTitle}`;
        this._updateFormTitle = `تعديل ${this.nameFieldTitle}`;
        this.command = new EnumTypeCommand(null).setCategory(this.category);
    }
    
    protected loadItems(params: HttpParams): Observable<IResponse<IEnumType[]>> {
        return this.api.get<IEnumType[]>(`enum-types?category=${this.category}`, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [];

    protected initCommand(item: IEnumType | null): void {
        this.command = new EnumTypeCommand(item).setCategory(this.category);
        if (item) {
            this.command.id = item.id;
        }
    }

}