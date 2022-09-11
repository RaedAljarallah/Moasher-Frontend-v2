import {Component} from '@angular/core';
import {DetailComponentBase} from "../../../core/abstracts/detail-component-base";
import {IProgram} from "../core/models/program.model";
import {ProgramCommand} from "../core/models/program.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {ITab} from "../../../shared/detail-page/detail-page.component";

@Component({
    selector: 'app-program-detail',
    templateUrl: './program-detail.component.html',
    styles: []
})
export class ProgramDetailComponent extends DetailComponentBase<IProgram, ProgramCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _deleteFormTitle: string = 'حذف برنامج';
    protected _updateFormTitle: string = 'تعديل برنامج';
    protected _modalId: string = 'ProgramDetail';

    protected initCommand(): void {
        this.command = new ProgramCommand(this.detailPageState!)
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IProgram[]>> {
        return this.api.get<IProgram[]>('programs', {params: params })
    }

    public tabs: ITab[] = [
        {id: 'performance', value: 'أداء البرنامج'},
        {id: 'objectives', value: 'الأهداف'},
        {id: 'entities', value: 'الجهات'},
        {id: 'kpis', value: 'المؤشرات'},
        {id: 'initiatives', value: 'المبادرات'}
    ];
}
