import {AbstractControl, ValidationErrors} from "@angular/forms";

export const passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  if (control == null) {
    return null;
  }
  // @ts-ignore
  const password: string = control.get('password').value; // get password from our password form control
  // console.log('PASSWORD1: ' + password);
  // @ts-ignore
  const password2: string = control.get('password2').value; // get password from our confirmPassword form control
  // console.log('PASSWORD2: ' + password2);
  // compare is the password math
  if (password != password2) {
    // if they don't match, set an error in our confirmPassword form control
    console.log('PASSWORD --> Err');
    // @ts-ignore
    control.get('password2').setErrors({ NoPasswordMatch: true });
    return({ NoPasswordMatch: true })
  } else {
    if (control.get('password2')?.hasError('NoPasswordMatch')) {      // if we don't check then focus won't work
      // @ts-ignore
      control.get('password2').setErrors({});
    }
    return null;
  }
}
