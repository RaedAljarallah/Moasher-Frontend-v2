import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from "./form.component";
import {FormInputComponent} from "./form-input/form-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePickerDirective} from "../directives/date-picker.directive";
import {NgSelectModule} from "@ng-select/ng-select";
import { SelectListComponent } from './select-list/select-list.component';


@NgModule({
    declarations: [
        FormComponent,
        FormInputComponent,
        DatePickerDirective,
        SelectListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
    ],
    exports: [
        FormComponent,
        FormInputComponent,
        SelectListComponent,
        DatePickerDirective
    ]
})
export class AppFormModule {
}
