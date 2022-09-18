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
import {IFilter} from "../../../core/models/filter.model";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";

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
        return this.api.get<IInitiative[]>(this._url, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'entityId'},
        {key: 'programId'},
        {key: 'portfolioId'},
        {key: 'l1Id'},
        {key: 'l2Id'},
        {key: 'l3Id'},
        {key: 'l4Id'},
        {key: 'stId'},
        {key: 'fstId'},
        {key: 'issueId'},
        {key: 'riskId'},

    ];
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
            name: 'المحفظة',
            id: 'portfolioId',
            type: "dynamic-list",
            dynamicListUrl: 'portfolios',
            listPlaceholder: 'الرجاء إختيار المحفظة'
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
            id: 'stId',
            type: "dynamic-list",
            dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeStatus}`,
            listPlaceholder: 'الرجاء إختيار حالة التنفيذ'
        },
        {
            name: 'حالة التمويل',
            id: 'fstId',
            type: "dynamic-list",
            dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeFundStatus}`,
            listPlaceholder: 'الرجاء إختيار حالة التمويل'
        },
        {
            name: 'حالة المعوقات',
            id: 'issueId',
            type: "dynamic-list",
            dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeIssueStatus}`,
            listPlaceholder: 'الرجاء إختيار حالة المعوقات'
        },
        {
            name: 'آثار المخاطر',
            id: 'riskId',
            type: "dynamic-list",
            dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeRiskImpact}`,
            listPlaceholder: 'الرجاء إختيار آثار المخاطر'
        }
    ]
}