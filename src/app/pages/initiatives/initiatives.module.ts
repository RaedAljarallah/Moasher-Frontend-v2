import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InitiativeDetailComponent} from "./initiative-detail/initiative-detail.component";
import {InitiativePerformanceComponent} from "./initiative-performance/initiative-performance.component";
import {SharedModule} from "../../shared/shared.module";
import {InitiativesRoutingModule} from "./initiatives-routing.module";
import { InitiativesListComponent } from './initiatives-list/initiatives-list.component';
import { InitiativeMilestonesComponent } from './initiative-milestones/initiative-milestones.component';
import { InitiativeDeliverablesComponent } from './initiative-deliverables/initiative-deliverables.component';
import { InitiativeApprovedCostsComponent } from './initiative-approved-costs/initiative-approved-costs.component';
import { InitiativeContractsComponent } from './initiative-contracts/initiative-contracts.component';
import { InitiativeBudgetsComponent } from './initiative-budgets/initiative-budgets.component';
import { InitiativeExpendituresComponent } from './initiative-expenditures/initiative-expenditures.component';
import { InitiativeIssuesComponent } from './initiative-issues/initiative-issues.component';
import { InitiativeRisksComponent } from './initiative-risks/initiative-risks.component';
import { InitiativeOverViewComponent } from './initiative-over-view/initiative-over-view.component';
import { InitiativeFormComponent } from './initiative-form/initiative-form.component';


@NgModule({
    declarations: [
        InitiativesListComponent,
        InitiativeDetailComponent,
        InitiativePerformanceComponent,
        InitiativeMilestonesComponent,
        InitiativeDeliverablesComponent,
        InitiativeApprovedCostsComponent,
        InitiativeContractsComponent,
        InitiativeBudgetsComponent,
        InitiativeExpendituresComponent,
        InitiativeIssuesComponent,
        InitiativeRisksComponent,
        InitiativeOverViewComponent,
        InitiativeFormComponent,
        
    ],
    imports: [
        CommonModule,
        InitiativesRoutingModule,
        SharedModule
    ],
    exports: [
        InitiativesListComponent,
        InitiativeDetailComponent,
        InitiativePerformanceComponent,
        InitiativeMilestonesComponent,
        InitiativeDeliverablesComponent,
        InitiativeApprovedCostsComponent,
        InitiativeContractsComponent,
        InitiativeBudgetsComponent,
        InitiativeExpendituresComponent,
        InitiativeIssuesComponent,
        InitiativeRisksComponent,
        InitiativeOverViewComponent,
        InitiativeFormComponent,
    ]
})
export class InitiativesModule {
}
