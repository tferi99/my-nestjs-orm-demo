import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFocusDirective} from "../core/directive/form-focus.directive";
import {OnEscapeDirective} from "../core/directive/on-escape.directive";
import {ConfirmDialogComponent} from './form/modal/confirm-dialog/confirm-dialog.component';
import {DndModule} from 'ngx-drag-drop';

@NgModule({
  declarations: [
    FormFocusDirective,
    OnEscapeDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    DndModule
  ],
  exports: [
    FormFocusDirective,
    OnEscapeDirective,
    ConfirmDialogComponent,
  ]
})
export class CoreModule { }
