import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthJwtTokenApplyInterceptor } from './auth-jwt-token-apply-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AuthRenewComponent } from './auth-renew/auth-renew.component';
import { FeatureSharedModule } from '../feature-shared/feature-shared.module';
import { APP_PRIMENG_MODULES, APP_PRIMENG_PROVIDERS } from '../layout/primeng-modules';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';

@NgModule({
  declarations: [
    LoginComponent,
    AuthRenewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FeatureSharedModule,

    // store
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducer),
    EffectsModule.forFeature(
      [
        AuthEffects,
      ]
    ),

    // PrimeNG
    APP_PRIMENG_MODULES,

    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthJwtTokenApplyInterceptor,
      multi: true
    },
    APP_PRIMENG_PROVIDERS,
  ],

  exports: [
    AuthRenewComponent,
    AuthRenewComponent
  ]
})
export class AuthModule { }
