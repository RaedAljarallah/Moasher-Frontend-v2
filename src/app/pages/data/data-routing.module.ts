import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataExportingComponent} from "./data-exporting/data-exporting.component";

const routes: Routes = [
    {path: 'data', component: DataExportingComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataRoutingModule {
}
