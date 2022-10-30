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
import {PortfoliosModule} from "./pages/portfolios/portfolios.module";
import {KPIsModule} from "./pages/kpis/kpis.module";
import {RisksRegisterModule} from "./pages/risks-register/risks-register.module";
import {IssuesLogModule} from "./pages/issues-log/issues-log.module";
import {UsersModule} from "./pages/users/users.module";

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
        KPIsModule,
        EntitiesModule,
        ProgramsModule,
        StrategicObjectivesModule,
        PortfoliosModule,
        RisksRegisterModule,
        IssuesLogModule,
        SettingsModule,
        UsersModule,
        AppRoutingModule,
        SharedModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
