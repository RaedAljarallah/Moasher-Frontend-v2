import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EntitiesRoutingModule} from './entities-routing.module';
import {EntitiesListComponent} from './entities-list/entities-list.component';
import {SharedModule} from "../../shared/shared.module";
import { EntityFormComponent } from './entity-form/entity-form.component';
import { EntityDetailComponent } from './entity-detail/entity-detail.component';
import { EntityPerformanceComponent } from './entity-performance/entity-performance.component';
import {InitiativesModule} from "../initiatives/initiatives.module";
import {KPIsModule} from "../kpis/kpis.module";
import {StrategicObjectivesModule} from "../strategic-objectives/strategic-objectives.module";
import {AnalyticsModule} from "../analytics/analytics.module";


@NgModule({
    declarations: [
        EntitiesListComponent,
        EntityFormComponent,
        EntityDetailComponent,
        EntityPerformanceComponent,
    ],
    imports: [
        CommonModule,
        EntitiesRoutingModule,
        InitiativesModule,
        KPIsModule,
        StrategicObjectivesModule,
        AnalyticsModule,
        SharedModule
    ],
    exports: [
        EntitiesListComponent,
        EntityFormComponent,
        EntityDetailComponent,
        EntityPerformanceComponent,
    ]
})
export class EntitiesModule {
}
