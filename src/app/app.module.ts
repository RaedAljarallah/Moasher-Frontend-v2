import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LayoutsModule} from "./layouts/layouts.module";
import {EntitiesModule} from "./pages/entities/entities.module";
import {InitiativesModule} from "./pages/initiatives/initiatives.module";
import {KPIsModule} from "./pages/kpis/kpis.module";
import {ProgramsModule} from "./pages/programs/programs.module";
import {StrategicObjectivesModule} from "./pages/strategic-objectives/strategic-objectives.module";
import {PortfoliosModule} from "./pages/portfolios/portfolios.module";
import {RisksRegisterModule} from "./pages/risks-register/risks-register.module";
import {IssuesLogModule} from "./pages/issues-log/issues-log.module";
import {SettingsModule} from "./pages/settings/settings.module";
import {UsersModule} from "./pages/users/users.module";
import {DataModule} from "./pages/data/data.module";
import {AccountsModule} from "./pages/accounts/accounts.module";
import {ErrorPagesModule} from "./error-pages/error-pages.module";
import {DashboardModule} from "./pages/dashboard/dashboard.module";
import {AuthorizeInterceptor} from "./core/interceptors/authorize.interceptor";
import {EditRequestsModule} from "./pages/edit-requests/edit-requests.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        LayoutsModule,
        DashboardModule,
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
        DataModule,
        AccountsModule,
        ErrorPagesModule,
        EditRequestsModule,
        AppRoutingModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
