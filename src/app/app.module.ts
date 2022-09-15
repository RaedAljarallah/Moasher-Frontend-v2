import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {EntitiesModule} from "./pages/entities/entities.module";
import {ProgramsModule} from "./pages/programs/programs.module";
import {StrategicObjectivesModule} from "./pages/strategic-objectives/strategic-objectives.module";
import {InitiativesModule} from "./pages/initiatives/initiatives.module";
import {SettingsModule} from "./pages/settings/settings.module";
import {ApiService} from "./core/services/api.service";
import {environment} from "../environments/environment";
import {ApiDevService} from "./core/services/api.dev.service";

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
        EntitiesModule,
        ProgramsModule,
        StrategicObjectivesModule,
        SettingsModule,
        AppRoutingModule,
        SharedModule,
    ],
    providers: [
        // { provide: ApiService, useClass: environment.production ? ApiService : ApiDevService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
