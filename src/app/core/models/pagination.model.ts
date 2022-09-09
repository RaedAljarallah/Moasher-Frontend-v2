export class Pagination {
    private _currentPage: number = 1;

    public pageSize: number = 10;
    public totalCount: number = 0;

    public get hasPreviousPage(): boolean {
        return this.currentPage > 1;
    }
    
    public get hasNextPage(): boolean {
        return this.currentPage < this.totalPages
    }
    
    public get totalPages(): number {
        return Math.ceil(this.totalCount / this.pageSize);
    }
    
    public get currentPage(): number {
        if (this._currentPage <= 1) {
            return 1;
        }
        
        if (this.totalCount <= this.pageSize) {
            this._currentPage = 1;
        }

        if (this._currentPage > this.totalPages) {
            this._currentPage = (this.totalPages == 0) ? 1 : this.totalPages;
        }
        
        return this._currentPage;
    }

    public set currentPage(value: number) {
        this._currentPage = Number(value);
    }
}