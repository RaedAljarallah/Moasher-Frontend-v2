import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IProject} from "../core/models/project/project.model";
import {ProjectCommand} from "../core/models/project/project.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from 'rxjs/operators';
import {IResponse} from "../../../core/models/response.model";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {ContractCommand} from "../core/models/contract/contract.command";
import {IContract} from "../core/models/contract/contract.model";

@Component({
    selector: 'app-initiative-projects',
    templateUrl: './initiative-projects.component.html',
    styles: []
})
export class InitiativeProjectsComponent extends TableComponentBase<IProject, ProjectCommand>{
    @Input() initiativeId: string = '';
    public isFormLoading: {[key: string]: boolean} = {};
    public contractCommand: ContractCommand = new ContractCommand(null);
    public contractFormAction: FormAction = FormAction.Create;
    
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة مشروع';
    protected _updateFormTitle: string = 'تعديل مشروع';
    protected _deleteFormTitle: string = 'حذف مشروع';
    protected _modalId: string = 'ProjectModal';

    protected override onInit() {
        this.modal.register("ContractModal");
        this.command = new ProjectCommand(null).setInitiativeId(this.initiativeId);
        this.headers = [
            {value: 'المشروع', classes: 'xl:min-w-[28rem]'},
            {value: 'المرحلة', classes: 'w-28'},
            {value: 'تاريخ الطرح المخطط', classes: 'w-28'},
            {value: 'تاريخ الطرح الفعلي', classes: 'w-28'},
            {value: 'تاريخ التعاقد المخطط', classes: 'w-28'},
            {value: 'تاريخ نهاية القعد المخطط', classes: 'w-28'},
            {value: 'القيمة التقديرية', classes: 'w-28'},
            {value: 'الحالة', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = [
            {name: 'مخطط للطرح من', id: 'plannedBiddingFrom', type: 'date'},
            {name: 'مخطط للطرح حتى', id: 'plannedBiddingTo', type: 'date'},
            {name: 'طرح من', id: 'actualBiddingFrom', type: 'date'},
            {name: 'طرح حتى', id: 'actualBiddingTo', type: 'date'},
            {name: 'مخطط للتعاقد من', id: 'plannedContractingFrom', type: 'date'},
            {name: 'مخطط للتعاقد حتى', id: 'plannedContractingTo', type: 'date'},
            {
                name: 'المرحلة',
                id: 'phaseId',
                type: "dynamic-list",
                dynamicListUrl: `enum-types?category=${EnumTypeCategory.InitiativeProjectPhase}`,
                isBadgeList: true,
                listPlaceholder: 'الرجاء إختيار المرحلة'
            },
            {
                name: 'الحالة',
                id: 'status',
                type: 'static-list',
                listPlaceholder: 'الرجاء إختيار الحالة',
                staticListItems: [
                    {name: 'على المسار', value: 'ontrack'},
                    {name: 'متأخر في الطرح', value: 'lateOnBidding'},
                    {name: 'متأخر في التعاقد', value: 'lateOnContracting'}
                ]
            }
        ];
        this.summary = [];
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IProject[]>> {
        return this.api.get<IProject[]>(`projects?initiativeId=${this.initiativeId}`, {params: params});
    }
    protected queryParams: { key: string; defaultValue?: string }[] = [
        {key: 'plannedBiddingFrom'},
        {key: 'plannedBiddingTo'},
        {key: 'actualBiddingFrom'},
        {key: 'actualBiddingTo'},
        {key: 'plannedContractingFrom'},
        {key: 'plannedContractingTo'},
        {key: 'phaseId'},
        {key: 'status'},
    ];

    protected initCommand(item: IProject | null): void {
        this.command = new ProjectCommand(item).setInitiativeId(this.initiativeId);
        if (item) {
            this.command.id = item.id;
        }
    }
    
    public override onUpdate(item: IProject) {
        this.formTitle = this._updateFormTitle;
        this.formAction = FormAction.Update;
        this.isFormLoading[item.id] = true;
        this.api.edit<ProjectCommand>(`projects/${item.id}/edit`).pipe(
            finalize(() => this.isFormLoading[item.id] = false)
        ).subscribe(res => {
            this.command = res.result;
            this.modal.open(this._modalId);
        })
    }
    
    public onCreateContract(item: IProject) {
        this.contractCommand = new ContractCommand(null)
            .castFromProject(item);
        this.modal.open("ContractModal");
    }
    
    public removeProject(item: IContract): void {
        this.table.deleteItem(item.projectId);
        this.modal.close("ContractModal");
    }
    
    public override onDestroy(): void {
        this.modal.unregister("ContractModal")
    }
}
