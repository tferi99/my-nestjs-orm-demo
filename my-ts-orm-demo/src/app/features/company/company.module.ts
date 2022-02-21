import {NgModule} from '@angular/core';
import {CompanyComponent} from './company.component';
import {CompanyListComponent} from './company-list/company-list.component';
import {CompanyFormComponent} from './company-form/company-form.component';
import {CompanyBoardComponent} from './company-board/company-board.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {RouterModule} from '@angular/router';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {CompanyModalComponent} from './company-modal/company-modal.component';
import {CoreModule} from '../../core/core.module';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyListComponent,
    CompanyFormComponent,
    CompanyBoardComponent,
    CompanyModalComponent,
  ],
  exports: [
    CompanyBoardComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PopoverModule,
    RouterModule,

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
