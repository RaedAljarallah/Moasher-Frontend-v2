import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {IResponse} from "../../../core/models/response.model";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {distinctUntilChanged, tap, switchMap, map, delay} from "rxjs/operators";
import {Pagination} from "../../../core/models/pagination.model";
import * as _ from 'lodash';
import {ApiService} from "../../../core/services/api.service";

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.html',
    
})
export class FormInputComponent implements OnInit {
    @Input() control: FormControl = new FormControl();
    @Input() type: 'text' | 'email' | 'password' | 'date' | 'list' | 'textarea' | 'checkbox' = 'text';
    @Input() placeholder: string = '';
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() listUrl: string = '';
    @Input() listType: 'static' | 'dynamic' = 'dynamic';
    @Input() bindLabel: string = 'name';
    @Input() staticListItems: {name: string, value: string}[] = [];
    @Input() dynamicListDefaultItems: any[] = [];
    @Input() badgeList: boolean = false;
    @Output() listValueSelected: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    public ngOnInit(): void {
    }
    
    public onListSelect(item: any) {
        this.listValueSelected.emit(item);
    }
}
