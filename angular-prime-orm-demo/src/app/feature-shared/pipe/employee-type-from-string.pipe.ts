import { Pipe, PipeTransform } from '@angular/core';
import {EmployeeType} from '@app/client-lib';
import {EmployeeTypePipe} from './employee-type-pipe';

@Pipe({
  name: 'employeeTypeFromString'
})
export class EmployeeTypeFromStringPipe implements PipeTransform {

  transform(value: string): EmployeeType {
    return EmployeeType[value as keyof typeof EmployeeType];
  }
}
