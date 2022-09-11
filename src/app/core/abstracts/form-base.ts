import {Component, EventEmitter, Input, Output} from "@angular/core";
import {IIdentifiable} from "../models/identifiable.model";
import {FormAction} from "../models/data-types/form-action.data-type";
import {FormGroup} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {finalize, Observable} from "rxjs";
import {IResponse} from "../models/response.model";
import {IResponseError} from "../models/response-error.model";

@Component({
    template: ''
})
export abstract class FormBase<TType, TCommand extends IIdentifiable> {
    @Input() inputCommand!: TCommand;
    @Input() formAction: FormAction = FormAction.Create;
    @Output() formSubmitted: EventEmitter<TType> = new EventEmitter<TType>();

    public form: FormGroup = new FormGroup({});
    public isDeleteRequest: boolean = false;
    public isLoading: boolean = false;
    public command!: TCommand;
    public globalErrors: string[] = [];
    
    protected constructor(protected api: ApiService) {
    }
    
    protected abstract _url: string;
    protected abstract initCommand(): void
    
    public onSubmit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.initCommand();
            let request$: Observable<IResponse<TType>> = new Observable<IResponse<TType>>();

            switch (this.formAction) {
                case FormAction.Create:
                    request$ = this.api.post<TCommand, TType>(this._url, this.command);
                    break;
                case FormAction.Update:
                    request$ = this.api.put<TCommand, TType>(`${this._url}/${this.command.id}`, this.command);
                    break;
                case FormAction.Delete:
                    request$ = this.api.delete(`${this._url}/${this.command.id}`);
            }

            request$.pipe(finalize(() => this.isLoading = false)).subscribe({
                next: (res) => this.formSubmitted.emit(res.result),
                error: (failure: IResponseError) => {
                    if (failure.statusCode === 400) {
                        this.setServerErrors(failure.errors);
                    } else {
                        this.globalErrors.push(failure.errors[''][0])
                    }
                }
            })
        }
    }
    
    private setServerErrors(errors: {[p: string]: string[]}): void {
        Object.keys(errors).forEach(key => {
            if (!key) {
                const globalErrors = errors[''];
                for(let error of globalErrors) {
                    this.globalErrors.push(error);
                }
            }
            
            const control = this.form.get(key);
            if (control) {
                control.setErrors({ serverError: errors[key]})
            }
        });
    }
}