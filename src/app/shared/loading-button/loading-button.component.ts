import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ladingBtnSpin, loadingBtn} from "../animations/app-animations.animation";

@Component({
    selector: 'app-loading-button',
    templateUrl: './loading-button.component.html',
    animations: [
        ladingBtnSpin,
        loadingBtn
    ]
})
export class LoadingButtonComponent implements OnInit {
    @Input() isLoading: boolean = false;
    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
    @Input() class: string = 'btn-md btn-primary';
    
    constructor() {
    }

    ngOnInit(): void {
    }

}
