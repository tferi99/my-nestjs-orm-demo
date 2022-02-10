import {AfterViewInit, Directive, ElementRef, HostListener, OnInit} from '@angular/core';

/**
 * It puts focus automatically to the first element that has one of these classes:
 *
 *    .focus          : you can force any element to set the focus on.
 *    .focusDelayed   : same as 'focus' but with a small delay (FOCUS_DELAY)
 *    .ng-invalid     : the 1st invalid FormControl
 *    .form-control'  : the 1st FormControl
 */

  // Sometimes immediate focus cannot work - for example on ngx-bootstrap modals -
  // then you need to wait some msecs.
const FOCUS_DELAY = 10;

@Directive({
  selector: '[appFormFocus]'
})
export class FormFocusDirective implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const focus = this.el.nativeElement.querySelector('.focus');
    console.log('>> focus:', focus);
    if (focus) {
      focus.focus();
      return;
    }

    const focusDelayed = this.el.nativeElement.querySelector('.focusDelayed');
    console.log('>> focusDelayed:', focusDelayed);
    if (focusDelayed) {
      setTimeout(() => focusDelayed.focus(), FOCUS_DELAY);
      return;
    }

    const invalidFormControl = this.el.nativeElement.querySelector('.ng-invalid');
    console.log('>> invalidFormControl:', invalidFormControl);
    if (invalidFormControl) {
      invalidFormControl.focus();
      return;
    }

    const formControl = this.el.nativeElement.querySelector('.form-control');
    console.log('>> formControl:', formControl);
    if (formControl) {
      formControl.focus();
      return;
    }
  }
}
