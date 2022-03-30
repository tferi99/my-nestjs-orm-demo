import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthJwtTokenApplyInterceptor} from './auth-jwt-token-apply-interceptor.service';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import { AuthRenewComponent } from './auth-renew/auth-renew.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    AuthRenewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,

    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthJwtTokenApplyInterceptor,
      multi: true
    },
  ],

  exports: [
    AuthRenewComponent,
    AuthRenewComponent
  ]
})
export class AuthModule { }
