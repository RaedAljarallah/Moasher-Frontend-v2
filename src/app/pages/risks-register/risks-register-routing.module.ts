import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RisksRegisterListComponent} from "./risks-register-list/risks-register-list.component";

const routes: Routes = [
    {path: 'risks-register', component: RisksRegisterListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RisksRegisterRoutingModule {
}
