import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-table-actions-buttons',
    templateUrl: './table-actions-buttons.component.html',
    styles: []
})
export class TableActionsButtonsComponent implements OnInit {
    @Input() isLoading: boolean = false;
    @Input() showUpdate: boolean = true;
    @Input() showDelete: boolean = true;
    @Output() UpdateBtnClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() DeleteBtnClicked: EventEmitter<void> = new EventEmitter<void>();
    
    constructor() {
    }

    ngOnInit(): void {
    }

}
