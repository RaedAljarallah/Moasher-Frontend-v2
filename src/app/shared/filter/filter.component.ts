import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFilter} from "../../core/models/filter.model";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styles: []
})
export class FilterComponent implements OnInit {
    @Input() filterFields: IFilter[] = [];
    @Input() showFilterPing: boolean = false;
    @Output() showFilterPingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() filterApplied: EventEmitter<void> = new EventEmitter<void>();
    
    public appliedFilters: { selectedFilterField?: IFilter, value?: any }[] = [];
    public routeUniqueQueries: string[] = [];
    
    constructor(private route: ActivatedRoute, private router: Router) {
        
    }

    ngOnInit(): void {
        
        const filterFieldKeys = this.filterFields.map(f => f.id);
        this.routeUniqueQueries = this.route.snapshot.queryParamMap.keys
            .filter(param => !filterFieldKeys.includes(param));

        this.filterFields.forEach(filter => {
            let param = this.route.snapshot.queryParamMap.get(filter.id);
            if (param) {
                this.appliedFilters.push({ selectedFilterField: filter, value: param });
            }
        });
        
        if (!this.appliedFilters.length) {
            this.appliedFilters.push({});
            this.emitShowFilter(false);
        } else {
            this.emitShowFilter(true);
        }

        
    }

    public changeFilterType(filterIndex: number, selectedFilter: IFilter) {
        this.appliedFilters[filterIndex].selectedFilterField = selectedFilter;
    }

    public removeFilter(filterIndex: number): void {
        this.appliedFilters.splice(filterIndex, 1);
    }

    public addNewFilter(): void {
        this.appliedFilters.push({});
    }
    
    public async resetFilters(): Promise<void> {
        this.appliedFilters.splice(0, this.filterFields.length);
        this.appliedFilters.push({});
        await this.applyFilters();
    }
    
    public updateFilterValue(filterIndex: number, value: any): void {
        const selectedFilter = this.appliedFilters[filterIndex];
        if (selectedFilter.selectedFilterField) {
            this.appliedFilters[filterIndex].value = value;
        }
    }

    public async applyFilters(): Promise<void> {
        let hasFilter: boolean = false;
        let params: Params = {};
        for (let param of this.routeUniqueQueries) {
            params[param] = this.route.snapshot.queryParamMap.get(param);
        }

        for (let filter of this.appliedFilters) {
            if (filter.selectedFilterField && filter.value) {
                hasFilter = true;
                params[filter.selectedFilterField.id] = filter.value;
            }
        }
        
        await this.router.navigate([], {
            relativeTo: this.route,
            queryParams: params,
        });

        this.emitShowFilter(hasFilter);
        this.filterApplied.emit();
    }

    public compareFn(item: any, selected: any): boolean {
        return item.id === selected.id;
    }
    
    
    private emitShowFilter(hasFilter: boolean): void {
        this.showFilterPing = hasFilter;
        this.showFilterPingChange.emit(this.showFilterPing);
    }
}
