import { Pipe, PipeTransform } from '@angular/core';
import {EmployeeType} from '@app/client-lib';

@Pipe({
  name: 'employeeType'
})
export class EmployeeTypePipe implements PipeTransform {

  transform(value: EmployeeType): unknown {
    switch (value) {
      case EmployeeType.DIRECTOR:
        return 'Director';
      case EmployeeType.MANAGER:
        return 'Manager';
      case EmployeeType.WORKER:
        return 'Worker';
      default:
        return '?';
    }
  }

}
