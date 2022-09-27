import {Component} from '@angular/core';
import {ListComponentBase} from "../../../core/abstracts/list-component-base";
import {IProgram} from "../core/models/program.model";
import {ProgramCommand} from "../core/models/program.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {IResponse} from "../../../core/models/response.model";
import {Observable} from "rxjs";

@Component({
    selector: 'app-programs-list',
    templateUrl: './programs-list.component.html',
    styles: []
})
export class ProgramsListComponent extends ListComponentBase<IProgram, ProgramCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }
    protected _modalId: string = 'createProgram';
    protected _rootUrl: string = 'programs';
    public command: ProgramCommand = new ProgramCommand(null);

    protected loadItems(params: HttpParams): Observable<IResponse<IProgram[]>> {
        return this.api.get<IProgram[]>(this._rootUrl, { params: params });
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [];
}
