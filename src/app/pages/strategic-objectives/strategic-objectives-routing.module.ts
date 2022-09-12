import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StrategicObjectivesListComponent} from "./strategic-objectives-list/strategic-objectives-list.component";
import {StrategicObjectiveDetailComponent} from "./strategic-objective-detail/strategic-objective-detail.component";

const routes: Routes = [
    {
        path: 'strategic-objectives',
        children: [
            { path: '', pathMatch: 'full', component: StrategicObjectivesListComponent, data: { animation: 'isLeft' }},
            { path: ':id', component: StrategicObjectiveDetailComponent, data: { animation: 'isRight' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StrategicObjectivesRoutingModule {
}