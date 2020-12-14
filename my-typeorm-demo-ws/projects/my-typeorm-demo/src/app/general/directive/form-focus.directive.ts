import {AfterViewInit, Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appFormFocus]'
})
export class FormFocusDirective implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
/*    const invalidFormControl = this.el.nativeElement.querySelector('.ng-invalid');
    const formControl = this.el.nativeElement.querySelector('.form-control');

    console.log('INVALID-FORM-CONTROL:', invalidFormControl);
    console.log('FORM-CONTROL:', formControl);
    if (invalidFormControl) {
      invalidFormControl.focus();
      return;
    }

    if (formControl) {
      formControl.focus();
      return;
    }*/
  }

  ngAfterViewInit(): void {
    const invalidFormControl = this.el.nativeElement.querySelector('.ng-invalid');
    const formControl = this.el.nativeElement.querySelector('.form-control');

    console.log('INVALID-FORM-CONTROL:', invalidFormControl);
    console.log('FORM-CONTROL:', formControl);
    if (invalidFormControl) {
      invalidFormControl.focus();
      return;
    }

    if (formControl) {
      formControl.focus();
      return;
    }
  }
}
