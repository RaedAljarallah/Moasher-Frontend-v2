import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AppLayoutComponent} from "./layouts/app-layout/app-layout.component";
import {EntitiesListComponent} from "./pages/entities/entities-list/entities-list.component";
import {EntityDetailComponent} from "./pages/entities/entity-detail/entity-detail.component";
import {ProgramsListComponent} from "./pages/programs/programs-list/programs-list.component";
import {ProgramDetailComponent} from "./pages/programs/program-detail/program-detail.component";
import {
    StrategicObjectivesListComponent
} from "./pages/strategic-objectives/strategic-objectives-list/strategic-objectives-list.component";
import {
    StrategicObjectiveDetailComponent
} from "./pages/strategic-objectives/strategic-objective-detail/strategic-objective-detail.component";
import {KpisListComponent} from "./pages/kpis/kpis-list/kpis-list.component";
import {KpiDetailComponent} from "./pages/kpis/kpi-detail/kpi-detail.component";
import {InitiativesListComponent} from "./pages/initiatives/initiatives-list/initiatives-list.component";
import {InitiativeDetailComponent} from "./pages/initiatives/initiative-detail/initiative-detail.component";
import {RisksRegisterListComponent} from "./pages/risks-register/risks-register-list/risks-register-list.component";
import {IssuesLogListComponent} from "./pages/issues-log/issues-log-list/issues-log-list.component";
import {PortfoliosListComponent} from "./pages/portfolios/portfolios-list/portfolios-list.component";
import {PortfolioDetailComponent} from "./pages/portfolios/portfolio-detail/portfolio-detail.component";
import {UsersListComponent} from "./pages/users/users-list/users-list.component";
import {DataExportingComponent} from "./pages/data/data-exporting/data-exporting.component";
import {SettingsPageComponent} from "./pages/settings/settings-page/settings-page.component";
import {ChangePasswordComponent} from "./pages/accounts/change-password/change-password.component";
import {NotFoundComponent} from "./error-pages/not-found/not-found.component";
import {ActivationComponent} from "./pages/accounts/activation/activation.component";
import {ApplicationPaths} from "./core/constants/api-authorization.constants";
import {LoginComponent} from "./pages/accounts/login/login.component";
import {LogoutComponent} from "./pages/accounts/logout/logout.component";
import {AuthorizeGuard} from "./core/guards/authorize.guard";

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent, canActivate: [AuthorizeGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
            {
                path: 'entities',
                children: [
                    {path: '', pathMatch: 'full', component: EntitiesListComponent, data: {animation: 'entityList'}},
                    {path: ':id', component: EntityDetailComponent, data: {animation: 'entityDetail'}}
                ]
            },
            {
                path: 'strategic-objectives',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: StrategicObjectivesListComponent,
                        data: {animation: 'objectiveList'}
                    },
                    {
                        path: ':id/:level',
                        component: StrategicObjectiveDetailComponent,
                        data: {animation: 'objectiveDetail'}
                    }
                ]
            },
            {
                path: 'programs',
                children: [
                    {path: '', pathMatch: 'full', component: ProgramsListComponent, data: {animation: 'programList'}},
                    {path: ':id', component: ProgramDetailComponent, data: {animation: 'programDetail'}}
                ]
            },
            {
                path: 'kpis',
                children: [
                    {path: '', pathMatch: 'full', component: KpisListComponent, data: {animation: 'kpiList'}},
                    {path: ':id', component: KpiDetailComponent, data: {animation: 'kpiDetail'}}
                ]
            },
            {
                path: 'initiatives',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: InitiativesListComponent,
                        data: {animation: 'initiativeList'}
                    },
                    {path: ':id', component: InitiativeDetailComponent, data: {animation: 'initiativeDetail'}}
                ]
            },
            {path: 'risks-register', component: RisksRegisterListComponent},
            {path: 'issues-log', component: IssuesLogListComponent},
            {
                path: 'portfolios',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: PortfoliosListComponent,
                        data: {animation: 'portfolioList'}
                    },
                    {path: ':id', component: PortfolioDetailComponent, data: {animation: 'portfolioDetail'}}
                ]
            },
            {path: 'users', component: UsersListComponent},
            {path: 'data', component: DataExportingComponent},
            {path: 'settings', component: SettingsPageComponent}
        ]
    },

    {
        path: '', children: [
            { path: ApplicationPaths.ChangePassword, component: ChangePasswordComponent},
            { path: ApplicationPaths.Activation, component: ActivationComponent },
            { path: ApplicationPaths.Login, component: LoginComponent },
            { path: ApplicationPaths.LoginFailed, component: LoginComponent },
            { path: ApplicationPaths.LoginCallback, component: LoginComponent },
            { path: ApplicationPaths.LogOut, component: LogoutComponent },
            { path: ApplicationPaths.LoggedOut, component: LogoutComponent },
            { path: ApplicationPaths.LogOutCallback, component: LogoutComponent }
        ]
    },

    { path: 'page-not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
