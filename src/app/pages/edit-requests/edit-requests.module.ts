import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditRequestsListComponent} from './edit-requests-list/edit-requests-list.component';
import {SharedModule} from "../../shared/shared.module";
import { EditRequestDetailComponent } from './edit-request-detail/edit-request-detail.component';


@NgModule({
    declarations: [
        EditRequestsListComponent,
        EditRequestDetailComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        EditRequestsListComponent,
        EditRequestDetailComponent
    ]
})
export class EditRequestsModule {
}
