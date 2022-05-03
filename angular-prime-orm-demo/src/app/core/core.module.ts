import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFocusDirective} from "../core/directive/form-focus.directive";
import {OnEscapeDirective} from "../core/directive/on-escape.directive";
////import {ConfirmDialogComponent} from './form/modal/confirm-dialog/confirm-dialog.component';
////import {DndModule} from 'ngx-drag-drop';
import { ValueRefreshedByTimerComponent } from './component/value-refreshed-by-timer.component';

@NgModule({
  declarations: [
    FormFocusDirective,
    OnEscapeDirective,
////    ConfirmDialogComponent,
    ValueRefreshedByTimerComponent
  ],
  imports: [
    CommonModule,
////    DndModule
  ],
  exports: [
    FormFocusDirective,
    OnEscapeDirective,
////    ConfirmDialogComponent,
    ValueRefreshedByTimerComponent
  ]
})
export class CoreModule { }
