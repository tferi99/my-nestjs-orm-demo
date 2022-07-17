import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFocusDirective } from "../core/directive/form-focus.directive";
import { OnEscapeDirective } from "../core/directive/on-escape.directive";
import { ValueRefreshedByTimerComponent } from './component/value-refreshed-by-timer.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    FormFocusDirective,
    OnEscapeDirective,
    ValueRefreshedByTimerComponent
  ],
  imports: [
    CommonModule,

    // PrimeNG
    DialogModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  exports: [
    FormFocusDirective,
    OnEscapeDirective,
    ValueRefreshedByTimerComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class CoreModule { }
