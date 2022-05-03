import { NgModule } from '@angular/core';
import { EmployeeTypePipe } from './pipe/employee-type-pipe';
////import { CompanyDeleteComponent } from './component/company-delete/company-delete.component';
////import { PersonDeleteComponent } from './component/person-delete/person-delete.component';
import { EmployeeTypeFromStringPipe } from './pipe/employee-type-from-string.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    EmployeeTypePipe,
    EmployeeTypeFromStringPipe,
////    CompanyDeleteComponent,
////    PersonDeleteComponent,
  ],
  exports: [
    EmployeeTypePipe,
    EmployeeTypeFromStringPipe,
////    CompanyDeleteComponent,
////    PersonDeleteComponent,
  ],
  imports: [
    CommonModule
  ],
})
export class FeatureSharedModule { }
