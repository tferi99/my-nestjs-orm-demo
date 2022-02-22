import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {RouterModule} from '@angular/router';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {CoreModule} from '../../core/core.module';
import {PersonListComponent} from './person-list/person-list.component';
import {PersonModalComponent} from './person-edit/person-modal/person-modal.component';
import {PersonEditComponent} from './person-edit/person-edit.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonModalComponent,
    PersonEditComponent,
  ],
  exports: [
    PersonListComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PopoverModule,
    RouterModule,

    // ngx-bootstrap
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),

    CoreModule,
    SharedModule
  ],
  providers: [
    BsModalRef
  ]
})
export class PersonModule { }
