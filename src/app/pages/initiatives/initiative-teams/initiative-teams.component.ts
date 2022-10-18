import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {TeamCommand} from "../core/models/team/team.command";
import {ITeam} from "../core/models/team/team.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from 'rxjs/operators';
import {IResponse} from "../../../core/models/response.model";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-initiative-teams',
    templateUrl: './initiative-teams.component.html',
    styles: []
})
export class InitiativeTeamsComponent extends TableComponentBase<ITeam, TeamCommand> {
    @Input() initiativeId: string = '';
    public isFormLoading: {[key: string]: boolean} = {};
    
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة عضو';
    protected _updateFormTitle: string = 'تعديل عضو';
    protected _deleteFormTitle: string = 'حذف عضو';
    protected _modalId: string = 'TeamModal';

    protected override onInit() {
        this.command = new TeamCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'الاسم', classes: 'xl:min-w-[12rem]'},
            {value: 'البريد الإلكتروني', classes: 'w-28'},
            {value: 'رقم الهاتف', classes: 'w-28'},
            {value: 'الدور', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {
                name: 'الدور',
                id: 'roleId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeTeamRole}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار الدور'
            },
        ];
    }

    protected loadItems(params: HttpParams): Observable<IResponse<ITeam[]>> {
        return this.api.get<ITeam[]>(`initiative-teams?initiativeId=${this.initiativeId}`, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [{key: 'roleId'}];

    protected initCommand(item: ITeam | null): void {
        this.command = new TeamCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }

    override onUpdate(item: ITeam) {
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.isFormLoading[item.id] = true;
        this.api.edit<TeamCommand>(`initiative-teams/${item.id}/edit`).pipe(
            finalize(() => this.isFormLoading[item.id] = false)
        ).subscribe(res => {
            this.command = res.result;
            this.modal.open(this._modalId);
        })
    }
}
