import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { EnumTypeComponent } from './enum-type/enum-type.component';
import { EnumTypeFormComponent } from './enum-type/enum-type-form/enum-type-form.component';


@NgModule({
    declarations: [
    SettingsPageComponent,
    EnumTypeComponent,
    EnumTypeFormComponent
  ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        SharedModule
    ],
    exports: [
      SettingsPageComponent,
      EnumTypeComponent,
      EnumTypeFormComponent
    ]
})
export class SettingsModule {
}
