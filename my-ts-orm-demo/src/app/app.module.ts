import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PersonFormComponent} from './features/person/person-form/person-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {PersonListComponent} from './features/person/person-list/person-list.component';
import {PersonComponent} from './features/person/person.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {HomeComponent} from './layout/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {CompanyComponent} from './features/company/company.component';
import {CompanyListComponent} from './features/company/company-list/company-list.component';
import {CompanyFormComponent} from './features/company/company-form/company-form.component';

import {StoreModule} from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {environment} from '../environments/environment';
import {LoggerModule} from 'ngx-logger';
import {HttpErrorInterceptor} from './core/error/http-error.interceptor';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AuthModule} from './auth/auth.module';
import {ValidatorErrorMessageDirective} from './core/directive/validator-error-message.directive';
import {ErrorMessageComponent} from './core/error/error-message/error-message.component';
import {EmployeeTypePipe} from './common/pipe/employee-type-pipe';
import {FormFocusDirective} from './core/directive/form-focus.directive';
import {OnEscapeDirective} from './core/directive/on-escape.directive';
import {EntityDataModule} from '@ngrx/data';
import {entityConfig} from './store/entity-metadata';
import {CompanyBoardComponent} from './features/company/company-board/company-board.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonFormComponent,
    ValidatorErrorMessageDirective,
    ErrorMessageComponent,
    PersonListComponent,
    EmployeeTypePipe,
    PersonComponent,
    HomeComponent,
    FormFocusDirective,
    OnEscapeDirective,
    CompanyComponent,
    CompanyListComponent,
    CompanyFormComponent,
    CompanyBoardComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    PopoverModule.forRoot(),
    LoggerModule.forRoot({
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false,
    }),
    AppRoutingModule,

    // ngx-bootstrap
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),

    // store
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
    EntityDataModule.forRoot(entityConfig),

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
