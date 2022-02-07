import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PersonFormComponent} from './person/person-form/person-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorErrorMessageDirective} from './common/validator-error-message.directive';
import {ErrorMessageComponent} from './common/error-message/error-message.component';
import {PersonListComponent} from './person/person-list/person-list.component';
import {EmployeeTypePipe} from './common/pipe/employee-type-pipe';
import {PersonComponent} from './person/person.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {HomeComponent} from './home/home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {FormFocusDirective} from './common/directive/form-focus.directive';
import {OnEscapeDirective} from './common/directive/on-escape.directive';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {CompanyComponent} from './company/company.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';

import {StoreModule} from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {environment} from '../environments/environment';
import {LoggerModule} from 'ngx-logger';
import {HttpErrorInterceptor} from './core/error/http-error.interceptor';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    PersonFormComponent,
    ValidatorErrorMessageDirective,
    ErrorMessageComponent,
    PersonListComponent,
    EmployeeTypePipe,
    EmployeeTypePipe,
    PersonComponent,
    HomeComponent,
    FormFocusDirective,
    OnEscapeDirective,
    CompanyComponent,
    CompanyListComponent,
    CompanyFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    PopoverModule.forRoot(),
    LoggerModule.forRoot({
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false,
    }),

    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      }
    }),
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

    EffectsModule.forRoot([]),
    EffectsModule.forFeature(
      [
        AuthEffects,
      ]
    ),

    // features
    AuthModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
