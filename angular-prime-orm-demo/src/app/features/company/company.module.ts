import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './company-list/company-list.component';
import { APP_PRIMENG_MODULES, APP_PRIMENG_PROVIDERS } from '../../layout/primeng-modules';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    CompanyListComponent,
  ],
  imports: [
    CommonModule,
    MomentModule,

    // PrimeNG
    APP_PRIMENG_MODULES,
  ],
  providers: [
    APP_PRIMENG_PROVIDERS,
  ]
})
export class CompanyModule { }
