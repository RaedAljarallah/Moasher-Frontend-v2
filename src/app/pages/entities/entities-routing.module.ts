import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EntitiesListComponent} from "./entities-list/entities-list.component";
import {EntityDetailComponent} from "./entity-detail/entity-detail.component";

const routes: Routes = [
    {
        path: 'entities',
        children: [
            { path: '', pathMatch: 'full', component: EntitiesListComponent, data: { animation: 'entityList' }},
            { path: ':id', component: EntityDetailComponent, data: { animation: 'entityDetail' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntitiesRoutingModule {
}
