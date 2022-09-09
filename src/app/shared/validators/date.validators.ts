import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class DateValidators {
    public static after(controlName: string, comparingControlName: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get(controlName);
            const comparingControl = group.get(comparingControlName);
            
            if (!control || !comparingControl) {
                console.error('Form controls can not be found in the form group');
                return { controlNotFound: false };
            }

            if (!control.value || !comparingControl.value) {
                return null;
            }
            
            const controlDate = new Date(control.value);
            const comparingDate = new Date(comparingControl.value);
            
            const error = controlDate >= comparingDate
                ? null
                : { afterDate: {requiredDate: comparingControl.value, actualDate: control.value }  };
            
            control.setErrors(error);
            return error;
        }
    }
}