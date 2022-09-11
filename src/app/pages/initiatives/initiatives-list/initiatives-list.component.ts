// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {BehaviorSubject, Observable} from "rxjs";
// import {ActivatedRoute, Params, Router} from "@angular/router";
// import {map, switchMap, distinctUntilChanged} from "rxjs/operators";
// import {IInitiative} from "../core/models/initiative.model";
// import {IResponse} from "../../../core/models/response.model";
// import {ApiService} from "../../../core/services/api.service";
// import {HttpParams} from "@angular/common/http";
// import {ModalService} from "../../../shared/modal/modal.service";
// import {IFilterOutput} from "../../../core/models/filter-output.model";
// import {InitiativeCommand} from "../core/models/initiative.command";
//
// @Component({
//     selector: 'app-initiatives-list',
//     templateUrl: './initiatives-list.component.html'
// })
// export class InitiativesListComponent implements OnInit, OnDestroy {
//     public command: InitiativeCommand = new InitiativeCommand(null);
//     public data$: Observable<IResponse<IInitiative[]>>;
//     public refresh$: BehaviorSubject<{ pageSize: number, pageNumber: number }>;
//
//     constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private modal: ModalService) {
//         this.data$ = new Observable<IResponse<IInitiative[]>>();
//         this.refresh$ = new BehaviorSubject<{ pageSize: number, pageNumber: number }>({ pageSize: 10, pageNumber: 1 });
//     }
//
//     ngOnInit(): void {
//         this.modal.register('createInitiative');
//         this.route.queryParams.subscribe((params: Params) => {
//             this.refresh$.next({ 
//                 pageSize: parseInt(params['ps'] ?? '10'),
//                 pageNumber: parseInt(params['pn'] ?? '1')
//             });
//             this.data$ = this.getDate(this.refresh$);
//         });
//
//     }
//
//     public ngOnDestroy(): void {
//         this.modal.unregister('createInitiative');
//     }
//    
//     public getDate(refresh$: BehaviorSubject<{ pageSize: number, pageNumber: number }>) : Observable<IResponse<IInitiative[]>> {
//         return refresh$.pipe(
//             distinctUntilChanged(),
//             map((params: { pageSize: number, pageNumber: number }) => {
//                 return new HttpParams()
//                     .append('pn', params.pageNumber)
//                     .append('ps', params.pageSize);
//             }),
//             switchMap((params: HttpParams) => {
//                 return this.api.get<IInitiative[]>('initiatives', { params: params });
//             })
//         )
//     }
//    
//     public async showDetail(item: IInitiative): Promise<void> {
//         await this.router.navigateByUrl(`initiatives/${item.id}`, { state: { id: item, name: item.name } })
//     }
//
//     public onCreate(): void {
//         this.modal.open('createInitiative');
//     }
//    
//     public async onSelectFilter(filter: IFilterOutput): Promise<void>  {
//         await this.router.navigate([], {
//             relativeTo: this.route,
//             queryParams: {
//                 [filter.param!]: filter.value
//             },
//             queryParamsHandling: 'merge'
//            
//         })
//     }
// }
