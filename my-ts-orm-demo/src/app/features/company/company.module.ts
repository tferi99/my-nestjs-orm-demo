import {NgModule} from '@angular/core';
import {CompanyListComponent} from './company-list/company-list.component';
import {CompanyBoardComponent} from './company-board/company-board.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {RouterModule} from '@angular/router';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {CompanyModalComponent} from './company-edit/company-modal/company-modal.component';
import {CoreModule} from '../../core/core.module';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { DndModule } from 'ngx-drag-drop';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyBoardComponent,
    CompanyModalComponent,
    CompanyEditComponent,
  ],
  exports: [
    CompanyBoardComponent,
    CompanyListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    PopoverModule,
    RouterModule,
    DndModule,

    // ngx-bootstrap
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),

    CoreModule
  ],
  providers: [
    BsModalRef
  ]
})
export class CompanyModule { }
