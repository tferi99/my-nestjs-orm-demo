import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './company-list/company-list.component';
import { APP_PRIMENG_MODULES, APP_PRIMENG_PROVIDERS } from '../../layout/primeng-modules';
import { MomentModule } from 'ngx-moment';
import { CompanyModalFormComponent } from './company-edit/company-modal-form/company-modal-form.component';
import { CompanyEditAdapterComponent } from './company-edit/company-edit-adapter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '../../core/core.module';
import { FeatureSharedModule } from '../../feature-shared/feature-shared.module';

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyModalFormComponent,
    CompanyEditAdapterComponent
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
export class CompanyModule { }
