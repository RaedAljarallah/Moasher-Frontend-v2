import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StrategicObjectivesRoutingModule} from './strategic-objectives-routing.module';
import {StrategicObjectivesListComponent} from './strategic-objectives-list/strategic-objectives-list.component';
import {StrategicObjectiveDetailComponent} from './strategic-objective-detail/strategic-objective-detail.component';
import {StrategicObjectiveFormComponent} from './strategic-objective-form/strategic-objective-form.component';
import {SharedModule} from "../../shared/shared.module";
import {InitiativesModule} from "../initiatives/initiatives.module";
import {KPIsModule} from "../kpis/kpis.module";


@NgModule({
    declarations: [
        StrategicObjectivesListComponent,
        StrategicObjectiveDetailComponent,
        StrategicObjectiveFormComponent
    ],
    imports: [
        CommonModule,
        StrategicObjectivesRoutingModule,
        SharedModule,
        InitiativesModule,
        KPIsModule,
    ],
    exports: [
        StrategicObjectivesListComponent,
        StrategicObjectiveDetailComponent,
        StrategicObjectiveFormComponent
    ]
})
export class StrategicObjectivesModule {
}
