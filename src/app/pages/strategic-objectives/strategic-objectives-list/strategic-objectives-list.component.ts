import {Component, Input} from '@angular/core';
import {ListComponentBase} from "../../../core/abstracts/list-component-base";
import {IStrategicObjectiveBase} from "../core/models/strategic-objective-base.model";
import {StrategicObjectiveCommand} from "../core/models/strategic-objective.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";

@Component({
    selector: 'app-strategic-objectives-list',
    templateUrl: './strategic-objectives-list.component.html',
    styles: []
})
export class StrategicObjectivesListComponent extends ListComponentBase<IStrategicObjectiveBase, StrategicObjectiveCommand> {
    @Input() level = 1;

    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _modalId: string = 'createObjective';
    protected _rootUrl: string = 'strategic-objectives';
    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'level', defaultValue: '1'}
    ];

    public command: StrategicObjectiveCommand = new StrategicObjectiveCommand(null);

    protected loadItems(params: HttpParams): Observable<IResponse<IStrategicObjectiveBase[]>> {
        if (!this.url) {
            this.url = this._rootUrl;
        }
        if (this.subList) {
            params = params.delete('level');
        }
        return this.api.get<IStrategicObjectiveBase[]>(this.url, {params: params});
    }

    public async setLevel(e: Event, level: number): Promise<void> {
        e.preventDefault();
        await this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                level: level
            },
            queryParamsHandling: 'merge'
        })
        this.level = level;
    }

    protected override onInit() {
        if (this.subList) {
            this.queryParams = [];
        }
        if (!this.subList) {
            const level = parseInt(this.route.snapshot.queryParamMap.get('level') ?? '1');
            this.level = !isNaN(level) ? level : 1;
        }
    }
}
