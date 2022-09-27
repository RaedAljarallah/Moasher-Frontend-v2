import {Component} from '@angular/core';
import {ITab} from "../../../shared/detail-page/detail-page.component";
import {EntityCommand} from "../core/models/entity.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {IEntity} from "../core/models/entity.model";
import {DetailComponentBase} from "../../../core/abstracts/detail-component-base";
import {IResponse} from "../../../core/models/response.model";

@Component({
    selector: 'app-entity-detail',
    templateUrl: './entity-detail.component.html',
    styles: []
})
export class EntityDetailComponent extends DetailComponentBase<IEntity, EntityCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }
    
    protected _deleteFormTitle: string = 'حذف جهة';
    protected _updateFormTitle: string = 'تعديل جهة';
    protected _modalId: string = 'EntityDetail';
    
    protected initCommand(): void {
        this.command = new EntityCommand(this.detailPageState!)
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IEntity[]>> {
        return this.api.get<IEntity[]>('entities', {params: params })
    }

    public tabs: ITab[] = [
        {id: 'performance', value: 'أداء الجهة'},
        {id: 'objectives', value: 'الأهداف'},
        {id: 'kpis', value: 'المؤشرات'},
        {id: 'initiatives', value: 'المبادرات'}
    ];
    
}