import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
    @Input() form: FormGroup = new FormGroup({});
    @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
    constructor() {
    }

    public ngOnInit(): void {
    }
    
    public submit(): void {
        this.formSubmitted.emit();
    }
}
