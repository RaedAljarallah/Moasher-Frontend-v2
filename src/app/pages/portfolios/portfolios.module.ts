import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from "../../shared/shared.module";
import { PortfoliosListComponent } from './portfolios-list/portfolios-list.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form.component';
import { PortfolioPerformanceComponent } from './portfolio-performance/portfolio-performance.component';
import {InitiativesModule} from "../initiatives/initiatives.module";
import {ProgramsModule} from "../programs/programs.module";
import {StrategicObjectivesModule} from "../strategic-objectives/strategic-objectives.module";


@NgModule({
    declarations: [
    PortfoliosListComponent,
    PortfolioDetailComponent,
    PortfolioFormComponent,
    PortfolioPerformanceComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        InitiativesModule,
        ProgramsModule,
        StrategicObjectivesModule
    ],
    exports: [
      PortfoliosListComponent,
      PortfolioDetailComponent,
      PortfolioFormComponent,
      PortfolioPerformanceComponent
    ]
})
export class PortfoliosModule {
}
