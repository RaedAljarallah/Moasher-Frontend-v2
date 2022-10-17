import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IsoDatePipe} from "./iso-date.pipe";
import {LocalCurrencyPipe} from "./local-currency.pipe";
import {VariancePipe} from "./variance.pipe";
import {BooleanToStringPipe} from "./boolean-to-string.pipe";



@NgModule({
  declarations: [
    IsoDatePipe,
    LocalCurrencyPipe,
    VariancePipe,
    BooleanToStringPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsoDatePipe,
    LocalCurrencyPipe,
    VariancePipe,
    BooleanToStringPipe,
  ]
})
export class PipesModule { }
