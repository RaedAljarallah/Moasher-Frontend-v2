import {AfterViewInit, Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {DateUtility} from "../../core/utilities/date.utility";
declare var Datepicker: any;

@Directive({
    selector: '[appDatePicker]'
})
export class DatePickerDirective implements AfterViewInit  {
    private datePicker: any;
    @Output() dateChange: EventEmitter<string> = new EventEmitter<string>();
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.datePicker = new Datepicker(this.el.nativeElement, {
            autohide: true,
            format: 'y-mm-dd',
            todayHighlight: false
        });
        
        this.el.nativeElement.addEventListener('changeDate', () => {
            
            this.dateChange.emit(this.datePicker.getDate('y-mm-dd'));
        })
    }

}
