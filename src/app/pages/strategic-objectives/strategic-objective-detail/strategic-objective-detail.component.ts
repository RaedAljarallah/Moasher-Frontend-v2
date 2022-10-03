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

    public override selectedTab = 'kpis';
    public level: number = 1;
    public initiativesUrl: string = '';
    public kpisUrl: string = '';
    
    protected initCommand(): void {
        this.command = new StrategicObjectiveCommand(this.detailPageState!);
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IStrategicObjectiveBase[]>> {
        params = params.append('level', this.route.snapshot.paramMap.get('level')!);
        return this.api.get<IStrategicObjectiveBase[]>('strategic-objectives', {params: params })
    }

    public tabs: ITab[] = [];
    
    public override onInit() {
        this.level = this.detailPageState!.level;
        this.generateRelativesUrl(this.level);
        this.tabs = this.getTabs(this.level);
    }
    
    private generateRelativesUrl(level: number): void {
        let queryParameter: string = '';
        if (level === 1) {
            queryParameter = 'l1Id';
        }
        if (level === 2) {
            queryParameter = 'l2Id';
        }
        if (level === 3) {
            queryParameter = 'l3Id';
        }
        if (level === 4) {
            queryParameter = 'l4Id';
        }
        
        this.initiativesUrl = `initiatives?${queryParameter}=${this.detailPageState!.id}`;
        this.kpisUrl = `kpis?${queryParameter}=${this.detailPageState!.id}`;
    }
    private getTabs(level: number): ITab[] {
        let tabs: ITab[] = [
            {id: 'kpis', value: 'المؤشرات'},
            {id: 'initiatives', value: 'المبادرات'},
        ];
        
        if (level === 1) {
            this.selectedTab = 'level-two-objectives';
            tabs.unshift(...[
                {id: 'level-two-objectives', value: 'أهداف المستوى الثاني'},
                {id: 'level-three-objectives', value: 'أهداف المستوى الثالث'},
                {id: 'level-four-objectives', value: 'أهداف المستوى الرابع'}
            ]);
        }
        
        if (level === 2) {
            this.selectedTab = 'level-three-objectives';
            tabs.unshift(...[
                {id: 'level-three-objectives', value: 'أهداف المستوى الثالث'},
                {id: 'level-four-objectives', value: 'أهداف المستوى الرابع'}
            ]);
        }
        
        if (level === 3) {
            this.selectedTab = 'level-four-objectives';
            tabs.unshift(...[
                {id: 'level-four-objectives', value: 'أهداف المستوى الرابع'}
            ]);
        }
        
        return tabs;
    }
}
