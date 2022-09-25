import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
    name: 'isoDate'
})
export class IsoDatePipe implements PipeTransform {

    transform(value: string | Date | null | undefined, ...args: unknown[]): string | null {
        if (value) {
            return new DatePipe('en-GB').transform(value, 'y-MM-dd');
        }
        
        return null;
    }

}
