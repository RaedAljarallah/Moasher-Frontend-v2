import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormAction} from "./data-types/form-action.data-type";
import {FormGroup} from "@angular/forms";

interface IIdentifiable {
    id: string;
}

@Component({
    template: ''
})
export abstract class FormBase<TCommand extends IIdentifiable> {
    @Input() inputCommand!: TCommand;
    @Input() formAction: FormAction = 1;
    @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

    public form: FormGroup = new FormGroup({});
    public isDeleteRequest: boolean = false;
    public isLoading: boolean = false;
}