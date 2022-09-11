import {
    Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
    TemplateRef
} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {IResponse} from "../../core/models/response.model";
import {Pagination} from "../../core/models/pagination.model";
import {IDetailPageState} from "../detail-page/detail-page.component";
import {collapse} from "../animations/app-animations.animation";

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
export class CollectionComponent implements OnInit, OnChanges {
    @Input() items: IResponse<any> | null = null;
    @Input() addBtnTitle: string = '';
    @Input() title: string = '';
    @Input() showStatus: boolean = true;
    @Input() withFilters: boolean = true;
    @ContentChild("listView") listViewTemplate!: TemplateRef<any>;
    @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
    @Output() addClicked: EventEmitter<void> = new EventEmitter<void>();
    
    public loadingPlaceholders: number[] = [];
    public pager?: Pagination;
    public showFilter: boolean = false;
    constructor() {
    }
    
    public ngOnInit(): void {
        this.setLoadingPlaceholders(3);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.items?.pagination) {
            this.pager = this.items.pagination;
        }
    }
    
    public get showAddBtn(): boolean {
        return true;
    }

    public async changePager(): Promise<void> {
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
}
