import {Component} from '@angular/core';
import {ListComponentBase} from "../../../core/abstracts/list-component-base";
import {IKpi} from "../core/models/kpi.model";
import {KpiCommand} from "../core/models/kpi.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {IFilter} from "../../../core/models/filter.model";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";

@Component({
    selector: 'app-kpis-list',
    templateUrl: './kpis-list.component.html',
    styles: []
})
export class KpisListComponent extends ListComponentBase<IKpi, KpiCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }
    protected _modalId: string = 'createKPI';
    protected _url: string = 'kpis';
    public command: KpiCommand = new KpiCommand(null);
    protected loadItems(params: HttpParams): Observable<IResponse<IKpi[]>> {
        return this.api.get<IKpi[]>(this._url, {params: params});
    }
    
    override filterFields: IFilter[] = [
        {
            name: 'الجهة',
            id: 'entityId',
            type: "dynamic-list",
            dynamicListUrl: 'entities',
            listPlaceholder: 'الرجاء إختيار الجهة'
        },
        {
            name: 'البرنامج',
            id: 'programId',
            type: "dynamic-list",
            dynamicListUrl: 'programs',
            listPlaceholder: 'الرجاء إختيار البرنامج'
        },
        {
            name: 'المستوى الأول',
            id: 'l1Id',
            type: "dynamic-list",
            dynamicListUrl: 'strategic-objectives?level=1',
            listPlaceholder: 'الرجاء إختيار هدف المستوى الأول'
        },
        {
            name: 'المستوى الثاني',
            id: 'l2Id',
            type: "dynamic-list",
            dynamicListUrl: 'strategic-objectives?level=2',
            listPlaceholder: 'الرجاء إختيار هدف المستوى الثاني'
        },
        {
            name: 'المستوى الثالث',
            id: 'l3Id',
            type: "dynamic-list",
            dynamicListUrl: 'strategic-objectives?level=3',
            listPlaceholder: 'الرجاء إختيار هدف المستوى الثالث'
        },
        {
            name: 'المستوى الرابع',
            id: 'l4Id',
            type: "dynamic-list",
            dynamicListUrl: 'strategic-objectives?level=4',
            listPlaceholder: 'الرجاء إختيار هدف المستوى الرابع'
        },
        {
            name: 'حالة التنفيذ',
            id: 'statusId',
            type: "dynamic-list",
            dynamicListUrl: `enum-types?category=${EnumTypeCategory.KPIStatus}`,
            listPlaceholder: 'الرجاء إختيار حالة التنفيذ',
            isBadgeList: true
        }
    ];
    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'entityId'},
        {key: 'programId'},
        {key: 'l1Id'},
        {key: 'l2Id'},
        {key: 'l3Id'},
        {key: 'l4Id'},
        {key: 'statusId'}
    ];
}
