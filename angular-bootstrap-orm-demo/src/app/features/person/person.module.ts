import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {RouterModule} from '@angular/router';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsModalRef, ModalModule} from 'ngx-bootstrap/modal';
import {CoreModule} from '../../core/core.module';
import {PersonListComponent} from './person-list/person-list.component';
import {PersonModalFormComponent} from './person-edit/person-modal-form/person-modal-form.component';
import {PersonEditComponent} from './person-edit/person-edit.component';
import {FeatureSharedModule} from '../../feature-shared/feature-shared.module';
import {MomentModule} from 'ngx-moment';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonModalFormComponent,
    PersonEditComponent,
  ],
  exports: [
    PersonListComponent,
    PersonEditComponent,
    PersonModalFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PopoverModule,
    RouterModule,

    // ngx
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    MomentModule,

    CoreModule,
    FeatureSharedModule
  ],
  providers: [
    BsModalRef
  ]
})
export class PersonModule { }
