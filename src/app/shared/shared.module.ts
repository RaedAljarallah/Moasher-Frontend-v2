import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {TableComponent} from './table/table.component';
import {PaginationComponent} from './pagination/pagination.component';
import { CollectionComponent } from './collection/collection.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import {ChartsModule} from "./charts/charts.module";
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavItemComponent } from './sidenav/sidenav-item/sidenav-item.component';
import { SidenavDividerComponent } from './sidenav/sidenav-divider/sidenav-divider.component';
import { SidenavItemGroupComponent } from './sidenav/sidenav-item-group/sidenav-item-group.component';
import {RouterModule} from "@angular/router";
import { IsoDatePipe } from './pipes/iso-date.pipe';
import { LocalCurrencyPipe } from './pipes/local-currency.pipe';
import { VariancePipe } from './pipes/variance.pipe';
import { BooleanToStringPipe } from './pipes/boolean-to-string.pipe';
import { ModalComponent } from './modal/modal.component';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import {AppFormModule} from "./form/app-form.module";
import {PipesModule} from "./pipes/pipes.module";
import { FilterComponent } from './filter/filter.component';

@NgModule({
    declarations: [
        TableComponent,
        PaginationComponent,
        CollectionComponent,
        DetailPageComponent,
        SidenavComponent,
        SidenavItemComponent,
        SidenavDividerComponent,
        SidenavItemGroupComponent,
        ModalComponent,
        LoadingButtonComponent,
        FilterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgSelectModule,
        FormsModule,
        AppFormModule,
        BrowserAnimationsModule,
        PipesModule,
        ChartsModule
    ],
    exports: [
        TableComponent,
        PaginationComponent,
        NgSelectModule,
        AppFormModule,
        ChartsModule,
        CollectionComponent,
        DetailPageComponent,
        SidenavComponent,
        SidenavItemComponent,
        SidenavDividerComponent,
        SidenavItemGroupComponent,
        ModalComponent,
        LoadingButtonComponent,
        PipesModule,
        FilterComponent
    ]
})
export class SharedModule {
}
