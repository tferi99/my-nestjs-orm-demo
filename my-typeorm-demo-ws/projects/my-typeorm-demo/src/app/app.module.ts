import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PersonFormComponent} from './person/person-form/person-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorErrorMessageDirective} from './general/validator-error-message.directive';
import {ErrorMessageComponent} from './general/error-message/error-message.component';
import {PersonListComponent} from './person/person-list/person-list.component';
import {EmployeeTypePipe} from './general/pipe/employee-type-pipe';
import {PersonComponent} from './person/person.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {FormFocusDirective} from './general/directive/form-focus.directive';
import {OnEscapeDirective} from './general/directive/on-escape.directive';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {CompanyComponent} from './company/company.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';

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
    PopoverModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
