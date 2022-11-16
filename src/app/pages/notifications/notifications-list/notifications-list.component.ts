import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Observable} from "rxjs";
import {INotification} from "../core/models/notification.model";
import {finalize} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";

@Component({
    selector: 'app-notifications-list',
    templateUrl: './notifications-list.component.html',
    styles: []
})
export class NotificationsListComponent implements OnInit {
    public notifications: INotification[] = [];
    public loadingPlaceholder = [1,2,3,4,5,6,7,8,9,10,11,12, 13];
    public isLoading: boolean = true;
    public isLoadMoreLoading: boolean = false;
    public notificationBody: string = '';
    public selectedId: string = '';
    public noMoreNotifications: boolean = false;
    public pageNumber: number = 1;
    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.loadNotifications();
    }
    
    public showBody(notification: INotification): void {
        if (notification) {
            this.selectedId = notification.id;
            this.notificationBody = notification.body;
            
            if (notification.hasRead) return;
            
            const index = this.notifications.findIndex(n => n.id === notification.id);
            if (index > -1) {
                this.notifications[index].hasRead = true;
            }
            
            this.api.put<any, any>(`notifications/${notification.id}`, {}).subscribe(res => {
                console.log('notification read');
            });
        }
        
    }
    
    public loadMore(e: Event): void {
        e.preventDefault();
        if (this.noMoreNotifications) return;
        this.isLoadMoreLoading = true;
        this.pageNumber += 1;
        this.loadNotifications();
    }
    
    private loadNotifications(): void {
        const params = new HttpParams()
            .append('pageNumber', this.pageNumber);
        
        this.api.get<INotification[]>('notifications', { params: params }).pipe(
            finalize(() => {
                this.isLoading = false;
                this.isLoadMoreLoading = false;
            })
        ).subscribe(res => {
            this.notifications.push(...res.result);
            
            if (this.selectedId === '') {
                this.selectedId = res.result[0]?.id;
            }
            
            if (this.notificationBody === '') {
                this.notificationBody = res.result[0]?.body;
            }
            
            if (res.pagination?.totalCount === this.notifications.length) {
                this.noMoreNotifications = true;
            }
        });
    }
}
