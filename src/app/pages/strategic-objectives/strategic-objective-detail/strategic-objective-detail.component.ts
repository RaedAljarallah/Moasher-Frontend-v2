import {Component} from '@angular/core';
import {DetailComponentBase} from "../../../core/abstracts/detail-component-base";
import {IStrategicObjectiveBase} from "../core/models/strategic-objective-base.model";
import {StrategicObjectiveCommand} from "../core/models/strategic-objective.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {ITab} from "../../../shared/detail-page/detail-page.component";

@Component({
    selector: 'app-strategic-objective-detail',
    templateUrl: './strategic-objective-detail.component.html',
    styles: []
})
export class StrategicObjectiveDetailComponent extends DetailComponentBase<IStrategicObjectiveBase, StrategicObjectiveCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _deleteFormTitle: string = 'حذف هدف إستراتيجي';
    protected _updateFormTitle: string = 'تعديل هدف إستراتيجي';
    protected _modalId: string = 'StrategicObjectiveDetail';

    protected initCommand(): void {
        this.level = this.detailPageState!.level;
        this.command = new StrategicObjectiveCommand(this.detailPageState!);
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IStrategicObjectiveBase[]>> {
        return this.api.get<IStrategicObjectiveBase[]>('strategic-objectives', {params: params })
    }

    public tabs: ITab[] = [
        {id: 'performance', value: 'أداء الجهة'},
        {id: 'objectives', value: 'الأهداف'},
        {id: 'kpis', value: 'المؤشرات'},
        {id: 'initiatives', value: 'المبادرات'}
    ];
    
    public level: number = 1;
}
