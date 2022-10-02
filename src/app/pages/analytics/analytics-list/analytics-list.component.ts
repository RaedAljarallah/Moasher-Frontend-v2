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
    @Input() parentType: "initiative" | "KPI" | "entity" = 'initiative';
    @Input() parentId: string = '';
    @Input() latest: boolean = false;
    @Input() model?: "initiatives" | "kpis";
    @Input() nameFieldTitle: string = 'التحليل';
    @Input() showParentName: boolean = false;

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
            {value: this.nameFieldTitle, classes: this.showParentName ? 'w-28' : 'xl:min-w-[28rem]'},
            {value: 'حلل بتاريخ', classes: 'w-28'},
            {value: 'حلل بواسطة', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        if (this.showParentName) {
            
            const parentName = this.model === 'initiatives' ? 'المبادرة' : 'مؤشر الأداء';
            this.headers.unshift({value: parentName, classes: 'xl:min-w-[28rem]'})
        }
        this.filterFields = [
            {name: 'حلل من', id: 'analyzedFrom', type: 'date'},
            {name: 'حلل حتى', id: 'analyzedTo', type: 'date'},
        ];

        switch (this.parentType) {
            case "initiative":
                this.url = `analytics?initiativeId=${this.parentId}`;
                break;
            case "KPI":
                this.url = `analytics?kpiId=${this.parentId}`;
                break;
            case "entity":
                this.url = `analytics?entityId=${this.parentId}`;
                break;
        }

        if (this.latest) {
            this.url = `${this.url}&latest=true`;
        }

        if (this.model) {
            this.url = `${this.url}&model=${this.model}`;
        }
        // TODO: add the following condition to all lists and tables
        if (this.subList) {
            this.queryParams = [];
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
        if (this.parentType != 'initiative' && this.parentType != 'KPI') {
            return;
        }
        this.command = new AnalyticCommand(item).setParentId(this.parentId, this.parentType);
        if (item) {
            this.command.id = item.id;
        }
    }
}
