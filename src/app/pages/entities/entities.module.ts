import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesListComponent } from './entities-list/entities-list.component';


@NgModule({
  declarations: [
    EntitiesListComponent
  ],
  imports: [
    CommonModule,
    EntitiesRoutingModule
  ],
  exports: [
    EntitiesListComponent
  ]
})
export class EntitiesModule { }
