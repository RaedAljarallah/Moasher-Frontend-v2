import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import {PipesModule} from "../../shared/pipes/pipes.module";



@NgModule({
  declarations: [
    NotificationsListComponent
  ],
    imports: [
        CommonModule,
        PipesModule
    ],
  exports: [
    NotificationsListComponent
  ]
})
export class NotificationsModule { }
