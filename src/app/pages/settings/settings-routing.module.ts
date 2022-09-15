import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsPageComponent} from "./settings-page/settings-page.component";

const routes: Routes = [
    {
        path: 'settings',
        children: [
            { path: '', pathMatch: 'full', component: SettingsPageComponent, data: { animation: 'isLeft' }}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
