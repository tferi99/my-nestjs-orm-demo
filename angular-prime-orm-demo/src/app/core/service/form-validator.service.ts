import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  constructor() { }

  getFormControlErrorMessage(c: AbstractControl): string {
    if (!(c instanceof FormControl) || !c.errors) {
      return '';
    }
    const ctrl = c as FormControl;
    if (!ctrl.errors) {
      return '';
    }
    if (ctrl.errors['required']) {
      return 'Required';
    } else if (ctrl.errors['email']) {
      return 'Bad email format';
    } else if (ctrl.errors['minlength']) {
      return 'Minimal length is: ' + ctrl.errors['minlength'].requiredLength;
    } else if (ctrl.errors['maxlength']) {
      return 'Maximal length is: ' + ctrl.errors['maxlength'].requiredLength;
    } else if (ctrl.errors['min']) {
      return 'Minimal value is: ' + ctrl.errors['min'].min;
    } else if (ctrl.errors['max']) {
      return 'Maximal value is: ' + ctrl.errors['max'].max;
    } else if (ctrl.errors['badFormat']) {
      return 'Bad format: ' + ctrl.errors['badFormat'].cause;
    } else {
      return 'Unknown error';
    }
  }

  getFormErrors(formGroup: FormGroup, errors: any = {}): string[] {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        const errs = control.errors;
        if (errs) {
          errors[field] = errs;
        }
      } else if (control instanceof FormGroup) {
        errors[field] = this.getFormErrors(control);
      }
    });
    return errors;
  }
}
