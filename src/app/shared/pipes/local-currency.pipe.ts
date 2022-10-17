import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from "@angular/common";

@Pipe({
    name: 'localCurrency'
})
export class LocalCurrencyPipe implements PipeTransform {

    transform(value: number | undefined, ...args: string[]): string | null {
        if(value) {
            return new CurrencyPipe('en-US').transform(value, ' ', 'symbol', '1.0-0')
        }
        if (args) {
            return args[0];
        }
        return '0';
    }

}
