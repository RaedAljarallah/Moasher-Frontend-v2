import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PortfoliosRoutingModule} from './portfolios-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { PortfoliosListComponent } from './portfolios-list/portfolios-list.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form.component';


@NgModule({
    declarations: [
    PortfoliosListComponent,
    PortfolioDetailComponent,
    PortfolioFormComponent
  ],
    imports: [
        CommonModule,
        PortfoliosRoutingModule,
        SharedModule
    ],
    exports: [
      PortfoliosListComponent,
      PortfolioDetailComponent,
      PortfolioFormComponent
    ]
})
export class PortfoliosModule {
}
