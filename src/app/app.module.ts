import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InitiativesModule} from "./pages/initiatives/initiatives.module";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ApiService} from "./core/services/api.service";
import {ApiDevService} from "./core/services/api.dev.service";
import {environment} from "../environments/environment";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        InitiativesModule,
        AppRoutingModule,
        SharedModule,
    ],
    providers: [
        { provide: ApiService, useClass: environment.production ? ApiService : ApiDevService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
