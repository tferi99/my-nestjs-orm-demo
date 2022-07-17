import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

/**
 * It puts focus automatically to the first element that has one of these classes:
 *
 *    .focus          : you can force any element to set the focus on.
 *    .ng-invalid     : the 1st invalid FormControl
 *    .form-control'  : the 1st FormControl
 *
 *    NOTE:
 *      Why we need .focusDelayed? Sometimes CSS class not detected properly during creation (e.g. in modal dialogs)
 */

  // Sometimes immediate focus cannot work - for example on ngx-bootstrap modals -
  // then you need to wait some msecs.
const FOCUS_DELAY = 10;

@Directive({
  selector: '[appFormFocus]'
})
export class FormFocusDirective implements OnInit, AfterViewInit {
  static tracing = false;

  @Input() focusDelayed = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.focusDelayed) {
      setTimeout(() => this.applyFocus(), FOCUS_DELAY);
    } else {
      this.applyFocus()
    }
  }

  private applyFocus() {
    const focus = this.el.nativeElement.querySelector('.focus');
    this.trace('class=focus:', focus);
    if (focus) {
      focus.focus();
      return;
    }

    const invalidFormControl = this.el.nativeElement.querySelector('.ng-invalid');
    this.trace('invalidFormControl:', invalidFormControl);
    if (invalidFormControl) {
      invalidFormControl.focus();
      return;
    }

    const formControl = this.el.nativeElement.querySelector('.form-control');
    this.trace('formControl:', formControl);
    if (formControl) {
      formControl.focus();
      return;
    }
  }

  private trace(msg: string, ...data: any[]) {
    if (FormFocusDirective.tracing) {
      console.log('[FOCUS]: ' + msg, data);
    }
  }
}
