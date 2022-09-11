import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {IEntity} from "../core/models/entity.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {EntityCommand} from "../core/models/entity.command";
import {ListComponentBase} from "../../../core/abstracts/list-component-base";

@Component({
    selector: 'app-entities-list',
    templateUrl: './entities-list.component.html',
    styles: []
})
export class EntitiesListComponent extends ListComponentBase<IEntity, EntityCommand> {
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }
    protected _modalId: string = 'createEntity';
    protected _url: string = 'entities';
    public command: EntityCommand = new EntityCommand(null);
    
    protected loadItems(params: HttpParams): Observable<IResponse<IEntity[]>> {
        return this.api.get<IEntity[]>(this._url, { params: params });
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [];
}