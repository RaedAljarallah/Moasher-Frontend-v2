import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
    @Input() form: FormGroup = new FormGroup({});
    
    constructor() {
    }

    public ngOnInit(): void {
    }
    
    public submit(): void {
        
    }
}
