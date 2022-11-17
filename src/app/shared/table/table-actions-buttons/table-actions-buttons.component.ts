import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthorizeService} from "../../../core/services/authorize.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-table-actions-buttons',
    templateUrl: './table-actions-buttons.component.html',
    styles: []
})
export class TableActionsButtonsComponent implements OnInit {
    @Input() isLoading: boolean = false;
    @Input() data: any;
    @Input() forceToShowButtons: boolean = false;
    @Input() usersType: string[] = [];
    @Output() UpdateBtnClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() DeleteBtnClicked: EventEmitter<void> = new EventEmitter<void>();

    public showAddBtn$: Observable<boolean> = new Observable<boolean>();
    
    constructor(private auth: AuthorizeService) {
    }

    public ngOnInit(): void {
        this.showAddBtn$ = this.auth.isInRoles(this.usersType);
    }

}
