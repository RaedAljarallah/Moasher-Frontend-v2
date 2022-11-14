import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Observable} from "rxjs";
import {INotification} from "../core/models/notification.model";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'app-notifications-list',
    templateUrl: './notifications-list.component.html',
    styles: []
})
export class NotificationsListComponent implements OnInit {
    public notifications: INotification[] = [];
    public loadingPlaceholder = [1,2,3,4,5,6,7,8,9,10,11,12, 13];
    public isLoading: boolean = true;
    public notificationBody: string = '';
    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.api.get<INotification[]>('notifications').pipe(
            finalize(() => this.isLoading = false)
        ).subscribe(res => {
            this.notifications = res.result;
            this.notificationBody = res.result[0]?.body;
        });
    }
    
    public showBody(notification: INotification): void {
        this.notificationBody = notification.body;
    }
}
