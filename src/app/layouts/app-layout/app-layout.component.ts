import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription, timer} from "rxjs";
import {ISearchResponse} from "../../core/models/search-response.model";
import {ApiService} from "../../core/services/api.service";
import {RouterOutlet} from "@angular/router";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, concatMap, tap} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {SearchCategoryUtility} from "../../core/utilities/search-category.utility";
import {slider} from "../../app-routing.animations";
import {collapse} from "../../shared/animations/app-animations.animation";
import {AppRoles, AuthorizeService} from "../../core/services/authorize.service";
import {INotification} from "../../pages/notifications/core/models/notification.model";

@Component({
    selector: 'app-app-layout',
    templateUrl: './app-layout.component.html',
    animations: [
        slider,
        collapse,
    ]
})
export class AppLayoutComponent implements OnInit, OnDestroy {
    public navExpanded: boolean = true;
    public dropdownOpen: boolean = false;
    private _searchQuery: string = '';
    public search$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public searchResult$: Observable<ISearchResponse[]> = new Observable<ISearchResponse[]>();
    public userName?: Observable<string | null | undefined>;
    
    public showPortfolio$: Observable<boolean> = new Observable<boolean>();
    public isSuperAdmin$: Observable<boolean> = new Observable<boolean>();
    public showSettings$: Observable<boolean> = new Observable<boolean>();
    public hasUnreadNotifications: boolean = false;
    public notificationSubscription?: Subscription;
    constructor(private api: ApiService, private auth: AuthorizeService) {

    }

    public ngOnInit(): void {
        this.showPortfolio$ = this.auth.isInRoles([
            AppRoles.ExecutionOperator, 
            AppRoles.FinancialOperator,
            AppRoles.DataAssurance,
            AppRoles.KPIsOperator
        ]);
        this.isSuperAdmin$ = this.auth.isSuperAdmin();
        this.showSettings$ = this.auth.isAdmin();
        this.userName = this.auth.getUserName();
        
        this.notificationSubscription = timer(5000, 60000).pipe(
            tap(() => console.log('get unread notifications')),
            map(() => {
                this.auth.getUser().pipe(
                    filter(u => !!u),
                    map(user => user?.sub),
                    concatMap(userId => {
                        if (userId) {
                            return this.api.get<INotification[]>(`notifications?read=false`).pipe(
                                map(res => res.result.length > 0)
                            )
                        }
                        return of(false);
                    }),
                    map(res => res)
                ).subscribe(res => this.hasUnreadNotifications = res);
            })
        ).subscribe();
        
    }

    public get searchQuery(): string {
        return this._searchQuery;
    }

    public set searchQuery(value: string) {
        this._searchQuery = value;
        this.search$.next(this._searchQuery);

        this.searchResult$ = this.search(this.search$);
    }

    public toggleNav(): void {
        this.navExpanded = !this.navExpanded;
    }

    public toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
    }

    public prepareRoute(outlet: RouterOutlet): string {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

    public search(search$: BehaviorSubject<string>): Observable<ISearchResponse[]> {
        return search$.pipe(
            filter(query => query.length > 3),
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap((query: string) => {
                const params = new HttpParams().append('searchQuery', query);
                return this.api.get<{ id: string, relativeId: string, title: string, category: string }[]>('search', {params: params}).pipe(
                    map(res => {
                        return res.result.map(r => ({
                            value: r.title,
                            category: SearchCategoryUtility.parse(r.category),
                            link: SearchCategoryUtility.getLink(r.category, r.relativeId)
                        }));
                    })
                )
            })
        )
    }

    public ngOnDestroy(): void {
        this.notificationSubscription?.unsubscribe();
    }

}
