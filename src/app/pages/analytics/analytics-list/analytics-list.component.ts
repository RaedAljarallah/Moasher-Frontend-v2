import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IAnalytic} from "../core/analytic.model";
import {AnalyticCommand} from "../core/analytic.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";

@Component({
    selector: 'app-analytics-list',
    templateUrl: './analytics-list.component.html',
    styles: []
})
export class AnalyticsListComponent extends TableComponentBase<IAnalytic, AnalyticCommand> {
    @Input() parentType: "initiative" | "KPI" = 'initiative';
    @Input() parentId: string = '';
    
    private url: string = '';
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة تحليل';
    protected _updateFormTitle: string = 'تعديل تحليل';
    protected _deleteFormTitle: string = 'حذف تحليل';
    protected _modalId: string = 'AnalyticsModal';
    
    protected override onInit() {
        this.command = new AnalyticCommand(null)
        this.headers = [
            {value: 'التحليل', classes: 'xl:min-w-[28rem]'},
            {value: 'حلل بتاريخ', classes: 'w-28'},
            {value: 'حلل بواسطة', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {name: 'حلل من', id: 'analyzedFrom', type: 'date'},
            {name: 'حلل حتى', id: 'analyzedTo', type: 'date'},
        ];
        
        if (this.parentType === 'initiative') {
            this.url = `analytics?initiativeId=${this.parentId}`;
        } else {
            this.url = `analytics?kpiId=${this.parentId}`;
        }
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'analyzedFrom'},
        {key: 'analyzedTo'},
    ];

    protected loadItems(params: HttpParams): Observable<IResponse<IAnalytic[]>> {
        return this.api.get<IAnalytic[]>(this.url, {params: params});
    }

    protected initCommand(item: IAnalytic | null): void {
        this.command = new AnalyticCommand(item).setParentId(this.parentId, this.parentType);
        if (item) {
            this.command.id = item.id;
        }
    }
}
