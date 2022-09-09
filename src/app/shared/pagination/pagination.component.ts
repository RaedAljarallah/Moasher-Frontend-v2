import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from "../../core/models/pagination.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    @Input() pager?: Pagination;
    @Input() maxSize: number = 5;
    @Output() pageChange: EventEmitter<void> = new EventEmitter<void>();
    
    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        
    }
    
    public get pages(): number[] {
        if (!this.pager) return [];
        
        let buttonsCount = Math.min(this.maxSize, this.pager.totalPages);
        let firstButton = this.pager.currentPage - Math.floor(buttonsCount / 2);
        firstButton = Math.max(firstButton, 1);
        firstButton = Math.min(firstButton, this.pager.totalPages - buttonsCount + 1);
        return [...Array(buttonsCount)].map((k, i) => i + firstButton);
    }
    
    public async setPage(page: number): Promise<void> {
        if (!this.pager) {
            return;
        }
        
        if (page < 1) {
            return;
        }
        
        if (page > this.pager.totalPages) {
            return;
        }
        
        if (page === this.pager.currentPage) {
            return ;
        }
        
        this.pager.currentPage = page;
        
        await this.firePageChangeEvent();
    }
    
    public async setPageSize(): Promise<void> {
        await this.firePageChangeEvent();
    }
    
    private async firePageChangeEvent() : Promise<void> {
        await this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                ps: this.pager?.pageSize,
                pn: this.pager?.currentPage
            },
            queryParamsHandling: 'merge'
        })
        this.pageChange.emit();
    }
}
