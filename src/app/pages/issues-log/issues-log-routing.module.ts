import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IssuesLogListComponent} from "./issues-log-list/issues-log-list.component";

const routes: Routes = [
    {path:'issues-log', component: IssuesLogListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IssuesLogRoutingModule {
}
