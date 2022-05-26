import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { CoreModule } from '../../core/core.module';
import { FeatureSharedModule } from '../../feature-shared/feature-shared.module';
import { APP_PRIMENG_MODULES, APP_PRIMENG_PROVIDERS } from '../../layout/primeng-modules';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonEditAdapterComponent } from './person-edit/person-edit-adapter.component';
import { PersonModalFormComponent } from './person-edit/person-modal-form/person-modal-form.component';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonEditAdapterComponent,
    PersonModalFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,

    MomentModule,

    CoreModule,
    FeatureSharedModule,

    // PrimeNG
    APP_PRIMENG_MODULES,
  ],
  providers: [
    APP_PRIMENG_PROVIDERS,
  ]

})
export class PersonModule { }
