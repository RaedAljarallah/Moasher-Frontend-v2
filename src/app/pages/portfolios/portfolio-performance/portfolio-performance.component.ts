import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-portfolio-performance',
    templateUrl: './portfolio-performance.component.html',
    styles: []
})
export class PortfolioPerformanceComponent implements OnInit {
    @Input() portfolioId: string = '';
    constructor() {
    }

    ngOnInit(): void {
    }

}
