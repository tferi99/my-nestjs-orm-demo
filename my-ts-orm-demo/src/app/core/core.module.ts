import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFocusDirective} from "../core/directive/form-focus.directive";
import {OnEscapeDirective} from "../core/directive/on-escape.directive";
import {ConfirmDialogComponent} from './form/modal/confirm-dialog/confirm-dialog.component';
import {DragDropListComponent} from './drag-and-drop/drag-drop-list/drag-drop-list.component';
import {DndModule} from 'ngx-drag-drop';

@NgModule({
  declarations: [
    FormFocusDirective,
    OnEscapeDirective,
    ConfirmDialogComponent,
    DragDropListComponent,
  ],
  imports: [
    CommonModule,
    DndModule
  ],
  exports: [
    FormFocusDirective,
    OnEscapeDirective,
    ConfirmDialogComponent,
    DragDropListComponent,
  ]
})
export class CoreModule { }
