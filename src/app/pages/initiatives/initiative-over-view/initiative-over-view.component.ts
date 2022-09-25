import {Component, Input, OnInit} from '@angular/core';
import {IInitiative} from "../core/models/initiative.model";

@Component({
    selector: 'app-initiative-over-view',
    templateUrl: './initiative-over-view.component.html',
    styles: []
})
export class InitiativeOverViewComponent implements OnInit {
    @Input() initiative!: IInitiative;
    
    constructor() {
    }

    ngOnInit(): void {
    }

}
