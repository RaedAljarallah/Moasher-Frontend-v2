import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";

const routes: Routes = [
    {
        path: 'users',
        children: [
            { path: '', pathMatch: 'full', component: UsersListComponent, data: { animation: 'isLeft' }}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
