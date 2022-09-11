import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgramsRoutingModule} from './programs-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { ProgramsListComponent } from './programs-list/programs-list.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { ProgramFormComponent } from './program-form/program-form.component';
import { ProgramPerformanceComponent } from './program-performance/program-performance.component';


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
