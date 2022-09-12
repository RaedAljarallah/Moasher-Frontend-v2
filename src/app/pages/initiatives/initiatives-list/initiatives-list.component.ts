import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {IInitiative} from "../core/models/initiative.model";
import {IResponse} from "../../../core/models/response.model";
import {ApiService} from "../../../core/services/api.service";
import {HttpParams} from "@angular/common/http";
import {ModalService} from "../../../shared/modal/modal.service";
import {InitiativeCommand} from "../core/models/initiative.command";
import {ListComponentBase} from "../../../core/abstracts/list-component-base";

@Component({
    selector: 'app-initiatives-list',
    templateUrl: './initiatives-list.component.html'
})
export class InitiativesListComponent extends ListComponentBase<IInitiative, InitiativeCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }
    protected _modalId: string = 'createInitiative';
    protected _url: string = 'initiatives';
    public command: InitiativeCommand = new InitiativeCommand(null);
    protected loadItems(params: HttpParams): Observable<IResponse<IInitiative[]>> {
        return this.api.get<IInitiative[]>(this._url, { params: params });
    }
    protected queryParams: { key: string; defaultValue?: string }[] = [];
}