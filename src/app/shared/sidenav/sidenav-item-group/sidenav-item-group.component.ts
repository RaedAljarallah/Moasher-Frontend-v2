import {Component, Input, OnInit} from '@angular/core';
import {collapse} from "../../animations/app-animations.animation";

@Component({
    selector: 'app-sidenav-item-group',
    templateUrl: './sidenav-item-group.component.html',
    styles: [],
    animations: [
        collapse
    ]
})
export class SidenavItemGroupComponent implements OnInit {
    @Input() expanded: boolean = false;
    @Input() name: string = '';
    @Input() icon: string = '';
    public isOpen: boolean = false;
    constructor() {
    }

    ngOnInit(): void {
    }
    
    public toggleMenu(e: Event) {
        e.preventDefault();
        this.isOpen = !this.isOpen;
    }

}
