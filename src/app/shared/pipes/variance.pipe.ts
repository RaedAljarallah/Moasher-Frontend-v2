import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Pipe({
    name: 'variance'
})
export class VariancePipe implements PipeTransform {

    transform(value: number | undefined, ...args: unknown[]): string {
        if (value) {
            let prefix = '';
            if (value > 0) {
                prefix = '+';
            }
            
            let formattedNumber = new DecimalPipe('en-US').transform(value, '1.0-0');
            return `${prefix}${formattedNumber}`;
        }
        
        return '0';
    }

}
