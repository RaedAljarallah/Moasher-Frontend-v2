import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppLayoutComponent} from './app-layout/app-layout.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
    declarations: [
        AppLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    exports: [
        AppLayoutComponent
    ]
})
export class LayoutsModule {
}
