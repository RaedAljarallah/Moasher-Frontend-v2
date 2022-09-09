import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'booleanToString'
})
export class BooleanToStringPipe implements PipeTransform {

    transform(value: boolean, ...args: unknown[]): string {
        if (value) {
            return 'نعم';
        }
        return 'لا';
    }

}
