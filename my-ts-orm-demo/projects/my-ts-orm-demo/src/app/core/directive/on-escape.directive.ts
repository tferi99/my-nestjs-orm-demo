import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appOnEscape]'
})
export class OnEscapeDirective {
  @Output() appOnEscape = new EventEmitter<number>();
  constructor() { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
    this.appOnEscape.emit(0);
  }
}
