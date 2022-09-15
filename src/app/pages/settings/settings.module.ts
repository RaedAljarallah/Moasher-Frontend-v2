import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { EnumTypeComponent } from './enum-type/enum-type.component';


@NgModule({
    declarations: [
    SettingsPageComponent,
    EnumTypeComponent
  ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        SharedModule
    ],
    exports: [
      SettingsPageComponent,
      EnumTypeComponent
    ]
})
export class SettingsModule {
}
