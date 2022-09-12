import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {IDetailPageState, ITab} from "../../../shared/detail-page/detail-page.component";
import {IInitiative} from "../core/models/initiative.model";
import {ApiService} from "../../../core/services/api.service";
import {HttpParams} from "@angular/common/http";
import {ModalService} from "../../../shared/modal/modal.service";
import {InitiativeCommand} from "../core/models/initiative.command";

@Component({
    selector: 'app-initiative-detail',
    templateUrl: './initiative-detail.component.html'
})
export class InitiativeDetailComponent implements OnInit, OnDestroy {
    public detailPageState: IDetailPageState | undefined;
    public isFormLoading: boolean = false;
    public command: InitiativeCommand = new InitiativeCommand(null);
    public tabs: ITab[] = [
        {id: 'performance', value: 'أداء المبادرة'},
        {id: 'issues', value: 'المعوقات'},
        {id: 'risks', value: 'المخاطر'},
        {id: 'milestones', value: 'المعالم'},
        {id: 'deliverables', value: 'المخرجات'},
        {id: 'approved-costs', value: 'التكاليف المعتمدة'},
        {id: 'contracts', value: 'العقود'},
        {id: 'budgets', value: 'الميزانيات'},
        {id: 'expenditures', value: 'المصروفات'},
        {id: 'analytics', value: 'التحليل'},
        {id: 'over-view', value: 'التفاصيل'},
        {id: 'documents', value: 'المستندات'}
    ]

    public selectedTab: string = 'performance';

    constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private modal: ModalService) {
        this.detailPageState = this.router.getCurrentNavigation()?.extras.state as IDetailPageState;
    }

    ngOnInit(): void {
        this.modal.register('InitiativeDetail');

        if (!this.detailPageState) {
            this.getData(this.route.snapshot.paramMap.get('id')!).subscribe(result => this.detailPageState = result);
        }

        this.route.queryParamMap.subscribe(param => {
            this.selectedTab = param.get('s') ?? this.selectedTab;
        });
    }

    public getData(id: string): Observable<IDetailPageState> {
        return this.api.get<IInitiative>('initiatives', {params: new HttpParams().append('id', id)})
            .pipe(
                map(res => {
                    return {id: res.result.id, value: res.result.name}
                })
            )
    }

    public delete() {

    }

    public update() {
        this.isFormLoading = true;
        this.api.get<InitiativeCommand>('initiatives', {params: new HttpParams().append('id', '1')})
            .pipe(
                map(res => res.result),
                tap(() => this.isFormLoading = false),
                tap(() => this.modal.open('InitiativeDetail'))
            ).subscribe(command => this.command = command);
    }

    public ngOnDestroy(): void {
        this.modal.unregister('InitiativeDetail');
    }

}
