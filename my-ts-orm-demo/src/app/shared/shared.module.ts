import {NgModule} from '@angular/core';
import {EmployeeTypePipe} from './pipe/employee-type-pipe';
import {CompanyDeleteComponent} from './component/company-delete/company-delete.component';
import {PersonDeleteComponent} from './component/person-delete/person-delete.component';

@NgModule({
  declarations: [
    EmployeeTypePipe,
    CompanyDeleteComponent,
    PersonDeleteComponent,
  ],
  exports: [
    EmployeeTypePipe,
    CompanyDeleteComponent,
    PersonDeleteComponent,
  ],
  imports: [
  ],
})
export class SharedModule { }
