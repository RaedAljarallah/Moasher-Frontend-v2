import {
    AfterViewInit,
    ChangeDetectorRef,
    Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
    TemplateRef
} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {IResponse} from "../../core/models/response.model";
import {Pagination} from "../../core/models/pagination.model";
import {collapse} from "../animations/app-animations.animation";
import {IFilter} from "../../core/models/filter.model";
import {AppRoles, AuthorizeService} from "../../core/services/authorize.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css'],
    animations: [
        trigger('fade', [
            transition('void => *', [
                query(':enter',
                    [style({opacity: 0}), stagger('60ms', animate('500ms ease-out', style({opacity: 1})))],
                    {optional: true}
                )
            ])
        ]),
        collapse
    ]
})
export class CollectionComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() items: IResponse<any> | null = null;
    @Input() addBtnTitle: string = '';
    @Input() title: string = '';
    @Input() showStatus: boolean = true;
    @Input() statusStyle: string | null = null;
    @Input() withFilters: boolean = true;
    @Input() filterFields: IFilter[] = [];
    @Input() subList: boolean = false;
    @ContentChild("listView") listViewTemplate!: TemplateRef<any>;
    @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
    @Output() addClicked: EventEmitter<void> = new EventEmitter<void>();
    
    public loadingPlaceholders: number[] = [];
    public pager?: Pagination;
    public showFilter: boolean = false;
    public filterApplied: boolean = false;
    public showAddBtn$: Observable<boolean> = new Observable<boolean>();
    constructor(private cd: ChangeDetectorRef, private auth: AuthorizeService) {
    }
    
    public ngOnInit(): void {
        this.showAddBtn$ = this.auth.isInRoles([AppRoles.Admin, AppRoles.SuperAdmin]);
        this.setLoadingPlaceholders(3);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.items?.pagination) {
            this.pager = this.items.pagination;
        }
    }
    
    public ngAfterViewInit(): void {
        this.cd.detectChanges();
    }

    public changePager(): void {
        const count = this.getLoadingPlaceholdersCount();
        this.setLoadingPlaceholders(count);
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
    
    public selectItem(item: any): void {
        this.itemSelected.emit(item);
    }

    public toggleFilter(): void {
        this.showFilter = !this.showFilter;
    }
    
    public addItem(item: any) {
        this.items!.result.unshift(item);
        this.pager!.totalCount += 1;
    }
    
    public getStatusClass(item: any): string {
        if (!this.showStatus) {
            return 'pr-4';
        }
        
        let statusStyle = 'border-r-8';
        if (item.status) {
            item.status.style 
                ? statusStyle = `${statusStyle} b-${item.status.style}`
                : statusStyle = `${statusStyle} b-gray-1`
        }
        return statusStyle;
    }
}
