import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProgramsListComponent} from "./programs-list/programs-list.component";
import {ProgramDetailComponent} from "./program-detail/program-detail.component";

const routes: Routes = [
    {
        path: 'programs',
        children: [
            { path: '', pathMatch: 'full', component: ProgramsListComponent, data: { animation: 'programList' }},
            { path: ':id', component: ProgramDetailComponent, data: { animation: 'programDetail' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramsRoutingModule {
}
