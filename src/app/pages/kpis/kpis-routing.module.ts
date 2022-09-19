import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KpisListComponent} from "./kpis-list/kpis-list.component";
import {KpiDetailComponent} from "./kpi-detail/kpi-detail.component";

const routes: Routes = [
    {
        path: 'kpis',
        children: [
            { path: '', pathMatch: 'full', component: KpisListComponent, data: { animation: 'isLeft' } },
            { path: ':id', component: KpiDetailComponent, data: { animation: 'isRight' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KPIsRoutingModule {
}
