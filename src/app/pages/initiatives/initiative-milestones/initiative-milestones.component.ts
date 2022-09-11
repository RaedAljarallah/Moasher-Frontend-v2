// import {Component, Input, OnDestroy, OnInit} from '@angular/core';
// import {ITableBreadcrumb, ITableHeader} from "../../../shared/table/table.component";
// import {IFilter} from "../../../core/models/filter.model";
// import {ApiService} from "../../../core/services/api.service";
// import {BehaviorSubject, Observable} from "rxjs";
// import {IResponse} from "../../../core/models/response.model";
// import {ActivatedRoute, Params, Router} from "@angular/router";
// import {ModalService} from "../../../shared/modal/modal.service";
// import {distinctUntilChanged, map, switchMap} from "rxjs/operators";
// import {HttpParams} from "@angular/common/http";
// import {IMilestone} from "../core/models/milestone/milestone.model";
// import {UrlUtility} from "../../../core/utilities/url.utility";
//
// @Component({
//     selector: 'app-initiative-milestones',
//     templateUrl: './initiative-milestones.component.html',
//     styles: []
// })
// export class InitiativeMilestonesComponent implements OnInit, OnDestroy {
//     @Input() initiativeId: string = '';
//
//     public headers: ITableHeader[] = [
//         {value: 'المعلم', classes: 'xl:min-w-[28rem]'},
//         {value: 'الوزن', classes: 'w-5'},
//         {value: 'الإنجاز المخطط', classes: 'w-28'},
//         {value: 'الإنجاز الفعلي', classes: 'w-28'},
//         {value: '', classes: 'w-full'},
//     ];
//
//     public filterFields: IFilter[] = [
//         {name: 'مخطط من', id: 'pf', type: 'date'},
//         {name: 'مخطط حتى', id: 'pt', type: 'date'},
//         {name: 'منجز من', id: 'af', type: 'date'},
//         {name: 'منجز حتى', id: 'at', type: 'date'},
//         {name: 'مستحق حتى', id: 'du', type: 'date'},
//         {
//             name: 'الحالة',
//             id: 'st',
//             type: 'static-list',
//             listPlaceholder: 'الرجاء إختيار الحالة',
//             staticListItems: [
//                 {name: 'منجزة', value: 'completed'},
//                 {name: 'غير منجزة', value: 'uncompleted'},
//                 {name: 'متأخرة', value: 'late'},
//                 {name: 'مستحقة', value: 'due'}
//             ]
//         },
//     ];
//
//     public milestonesSummary: ITableBreadcrumb[] = [
//         {name: 'جميع المعالم', value: '25'},
//         {name: 'منجزة', value: '25'},
//         {name: 'غير منجزة', value: '25'},
//         {name: 'متأخرة', value: '25'},
//         {name: 'مستحقة', value: '25'},
//     ];
//
//     public data$: Observable<IResponse<IMilestone[]>>;
//     public refresh$: BehaviorSubject<{ [k: string]: string }>;
//
//     constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private modal: ModalService) {
//         this.data$ = new Observable<IResponse<IMilestone[]>>();
//         this.refresh$ = new BehaviorSubject<{ [k: string]: string }>({pageSize: '10', pageNumber: '1'});
//     }
//
//     public ngOnInit(): void {
//         this.modal.register('createMilestone');
//         this.route.queryParams.subscribe((params: Params) => {
//             this.refresh$.next({
//                 ps: params['ps'] ?? '10',
//                 pn: params['pn'] ?? '1',
//                 q: params['q'],
//                 pf: params['pf'],
//                 pt: params['pt'],
//                 af: params['af'],
//                 at: params['at'],
//                 du: params['du']
//             });
//             this.data$ = this.getDate(this.refresh$);
//         });
//     }
//
//     public ngOnDestroy(): void {
//         this.modal.unregister('createMilestone');
//     }
//
//     public getDate(refresh$: BehaviorSubject<{ [k: string]: string }>): Observable<IResponse<IMilestone[]>> {
//         return refresh$.pipe(
//             distinctUntilChanged(),
//             map((params: { [k: string]: string }) => {
//                 return UrlUtility.getHttpParams(params);
//             }),
//             switchMap((params: HttpParams) => {
//                 return this.api.get<IMilestone[]>(`initiatives/${this.initiativeId}/milestones`, {params: params});
//             })
//         )
//     }
// }
