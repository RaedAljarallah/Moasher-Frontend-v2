import {
    AfterViewInit, ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnChanges, OnInit,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {collapse} from "../animations/app-animations.animation";
import {IResponse} from "../../core/models/response.model";
import {Pagination} from "../../core/models/pagination.model";
import {IFilter} from "../../core/models/filter.model";

export interface ITableHeader {
    value: string,
    classes?: string,
}

export interface  ITableBreadcrumb {
    name: string,
    value: string,
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    animations: [
        collapse
    ]
})

export class TableComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() headers: ITableHeader[] = [];
    @Input() items: IResponse<any> | null = null;
    @Input() filterFields: IFilter[] = [];
    @Input() breadcrumbs: ITableBreadcrumb[] | null = null;
    
    @ContentChild("tableCell") tableCellTemplate!: TemplateRef<any>;
    
    public pager?: Pagination;
    public loadingPlaceholders: number[] = [];
    public showFilter: boolean = false;
    public filterApplied: boolean = false;

    private _searchQuery: string = '';
    constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {
    }

    public ngOnInit(): void {
        this.setLoadingPlaceholders(3);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.items?.pagination) {
            this.pager = this.items.pagination;
        }
    }

    ngAfterViewInit(): void {
        this.cd.detectChanges();
    }

    
    public changePager(): void {
        const count: number = this.getLoadingPlaceholdersCount();
        this.setLoadingPlaceholders(count);
    }

    public get showAddBtn(): boolean {
        return true;
    }

    private setLoadingPlaceholders(count: number): void {
        this.loadingPlaceholders = Array.from(Array(count).keys()).map(x => x + 1);
    }

    private getLoadingPlaceholdersCount(): number {
        if (this.pager!.totalPages > 1) {
            if (this.pager!.currentPage == this.pager!.totalPages) {
                return this.pager!.totalCount - ((this.pager!.currentPage - 1) * this.pager!.pageSize);
            }
            return this.pager!.pageSize;
        }
        return this.pager!.totalCount;
    }

    public toggleFilter(): void {
        this.showFilter = !this.showFilter;
    }
    
    public async search(searchQuery: string): Promise<void> {
        if (this._searchQuery === searchQuery) return;
        searchQuery = searchQuery.trim();
        await this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                q: searchQuery.length > 0 ? searchQuery : null
            },
            queryParamsHandling: 'merge'
        });
        this._searchQuery = searchQuery;
    }
}
