import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Observable} from "rxjs";
import {IInitiativeDetails} from "../core/models/initiative-details.model";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-initiative-over-view',
    templateUrl: './initiative-over-view.component.html',
    styles: []
})
export class InitiativeOverViewComponent implements OnInit {
    @Input() initiativeId?: string;
    
    public result$: Observable<IInitiativeDetails> = new Observable<IInitiativeDetails>();
    
    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.result$ = this.api.get<IInitiativeDetails>(`initiatives/${this.initiativeId}`).pipe(
            map(res => res.result)
        );
    }

}
