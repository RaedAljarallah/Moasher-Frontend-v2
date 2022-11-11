import {Component, Input, OnInit} from '@angular/core';
import {IEditRequestDetails} from "../core/models/edit-request-details.model";

@Component({
    selector: 'app-edit-request-detail',
    templateUrl: './edit-request-detail.component.html',
    styles: []
})
export class EditRequestDetailComponent implements OnInit {
    @Input() details!: IEditRequestDetails;
    constructor() {
    }

    ngOnInit(): void {
        console.log(this.details);
    }

}
