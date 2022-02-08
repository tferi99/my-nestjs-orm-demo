import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const cause = PasswordValidatorUtil.validate(control.value);
    return !cause ? null: {badFormat: {cause}};
  };
}

export class PasswordValidatorUtil {
  public static validate(val: string): string | null {
    if (!val) {
      return null;          // no password specified
    }

    let regex: RegExp;

    // length
    const minLen = 3;
    if (val.length < minLen) {
      return 'Min length is ' + minLen;
    }
return null;
    // at least 1 number
    if(!/\d/.test(val)) {
      return 'At least 1 number';
    }

    // at least 1 capital case
    if(!/[A-Z]/.test(val)) {
      return 'At least 1 Capital case';
    }

    // at least 1 small case
    if(!/[a-z]/.test(val)) {
      return 'At least 1 small case';
    }

    return null;
  }
}
