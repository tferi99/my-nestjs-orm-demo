import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {ErrorMessageComponent} from '../error/error-message/error-message.component';

@Directive({
  selector: '[appValidatorErrorMessage]',
})
export class ValidatorErrorMessageDirective implements OnInit, OnChanges {
  @Input() appValidatorErrorMessage: Array<any>;

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.container.createEmbeddedView(this.template);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.container.clear();

    this.container.createEmbeddedView(this.template);

    const factory = this.resolver.resolveComponentFactory(ErrorMessageComponent);
    const componentRef = this.container.createComponent(factory);
  }

}
