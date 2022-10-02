import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramsRoutingModule} from './programs-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { ProgramsListComponent } from './programs-list/programs-list.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { ProgramFormComponent } from './program-form/program-form.component';
import { ProgramPerformanceComponent } from './program-performance/program-performance.component';
import {InitiativesModule} from "../initiatives/initiatives.module";
import {KPIsModule} from "../kpis/kpis.module";
import {EntitiesModule} from "../entities/entities.module";
import {StrategicObjectivesModule} from "../strategic-objectives/strategic-objectives.module";


@NgModule({
    declarations: [
    ProgramsListComponent,
    ProgramDetailComponent,
    ProgramFormComponent,
    ProgramPerformanceComponent
  ],
    imports: [
        CommonModule,
        ProgramsRoutingModule,
        InitiativesModule,
        KPIsModule,
        EntitiesModule,
        StrategicObjectivesModule,
        SharedModule
    ],
    exports: [
      ProgramsListComponent,
      ProgramDetailComponent,
      ProgramFormComponent,
      ProgramPerformanceComponent
    ]
})
export class ProgramsModule {
}
