import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {slider} from "./app-routing.animations";
import {BehaviorSubject, Observable} from "rxjs";
import {map, debounceTime, filter, distinctUntilChanged, switchMap} from "rxjs/operators";
import {ISearchResponse} from "./core/models/search-response.model";
import {collapse} from "./shared/animations/app-animations.animation";
import {HttpParams} from "@angular/common/http";
import {ApiService} from "./core/services/api.service";
import {SearchCategoryUtility} from "./core/utilities/search-category.utility";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        slider,
        collapse,
    ]
})
export class AppComponent implements OnInit {
    public navExpanded: boolean = true;
    public dropdownOpen: boolean = false;
    public title = 'مؤشر';
    
    private _searchQuery: string = '';
    public search$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public searchResult$: Observable<ISearchResponse[]> = new Observable<ISearchResponse[]>();
    
    constructor(private api: ApiService) {

    }

    public ngOnInit(): void {

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
                return this.api.get<{id: string, relativeId: string, title: string, category: string}[]>('search', {params: params}).pipe(
                    map(res => {
                        return res.result.map(r => ({
                            value: r.title,
                            category: SearchCategoryUtility.parse(r.category),
                            link:SearchCategoryUtility.getLink(r.category, r.relativeId)
                        }));
                    })
                )
            })
        )
    }
    
}
