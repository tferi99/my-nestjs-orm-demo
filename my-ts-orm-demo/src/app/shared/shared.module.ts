import {NgModule} from '@angular/core';
import {EmployeeTypePipe} from './pipe/employee-type-pipe';

@NgModule({
  declarations: [
    EmployeeTypePipe
  ],
  exports: [
    EmployeeTypePipe
  ],
  imports: [
  ],
})
export class SharedModule { }
