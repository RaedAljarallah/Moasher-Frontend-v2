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
import { InitiativeMilestoneFormComponent } from './initiative-milestones/initiative-milestone-form/initiative-milestone-form.component';
import { InitiativeDeliverableFormComponent } from './initiative-deliverables/initiative-deliverable-form/initiative-deliverable-form.component';
import { InitiativeApprovedCostFormComponent } from './initiative-approved-costs/initiative-approved-cost-form/initiative-approved-cost-form.component';
import { InitiativeBudgetFormComponent } from './initiative-budgets/initiative-budget-form/initiative-budget-form.component';
import { InitiativeIssueFormComponent } from './initiative-issues/initiative-issue-form/initiative-issue-form.component';
import { InitiativeRiskFormComponent } from './initiative-risks/initiative-risk-form/initiative-risk-form.component';
import { InitiativeTeamsComponent } from './initiative-teams/initiative-teams.component';
import { InitiativeTeamFormComponent } from './initiative-teams/initiative-team-form/initiative-team-form.component';
import {AnalyticsModule} from "../analytics/analytics.module";
import { InitiativeProjectsComponent } from './initiative-projects/initiative-projects.component';
import { InitiativeProjectFormComponent } from './initiative-projects/initiative-project-form/initiative-project-form.component';


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
        InitiativeMilestoneFormComponent,
        InitiativeDeliverableFormComponent,
        InitiativeApprovedCostFormComponent,
        InitiativeBudgetFormComponent,
        InitiativeIssueFormComponent,
        InitiativeRiskFormComponent,
        InitiativeTeamsComponent,
        InitiativeTeamFormComponent,
        InitiativeProjectsComponent,
        InitiativeProjectFormComponent,

    ],
    imports: [
        CommonModule,
        InitiativesRoutingModule,
        AnalyticsModule,
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
        InitiativeMilestoneFormComponent,
        InitiativeDeliverableFormComponent,
        InitiativeApprovedCostFormComponent,
        InitiativeBudgetFormComponent,
        InitiativeIssueFormComponent,
        InitiativeRiskFormComponent,
        InitiativeTeamsComponent,
        InitiativeTeamFormComponent,
        InitiativeProjectsComponent,
        InitiativeProjectFormComponent,
    ]
})
export class InitiativesModule {
}
