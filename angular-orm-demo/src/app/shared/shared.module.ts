import {NgModule} from '@angular/core';
import {EmployeeTypePipe} from './pipe/employee-type-pipe';
import {CompanyDeleteComponent} from './component/fetures/company-delete/company-delete.component';
import {PersonDeleteComponent} from './component/fetures/person-delete/person-delete.component';
import {EmployeeTypeFromStringPipe} from './pipe/employee-type-from-string.pipe';
import {ValueRefreshedByTimerComponent} from './component/common/value-refreshed-by-timer.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    EmployeeTypePipe,
    EmployeeTypeFromStringPipe,
    CompanyDeleteComponent,
    PersonDeleteComponent,
    ValueRefreshedByTimerComponent,
  ],
  exports: [
    EmployeeTypePipe,
    EmployeeTypeFromStringPipe,
    CompanyDeleteComponent,
    PersonDeleteComponent,
    ValueRefreshedByTimerComponent,
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
