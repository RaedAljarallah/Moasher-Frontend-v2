import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {InitiativeDetailComponent} from "./initiative-detail/initiative-detail.component";
import {InitiativesListComponent} from "./initiatives-list/initiatives-list.component";

const routes: Routes = [
    {
        path: 'initiatives',
        children: [
            { path: '', pathMatch: 'full', component: InitiativesListComponent, data: { animation: 'isLeft' } },
            { path: ':id', component: InitiativeDetailComponent, data: { animation: 'isRight' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InitiativesRoutingModule { }