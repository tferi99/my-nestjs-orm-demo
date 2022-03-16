import { PersonDto, EmployeeType } from 'my-ts-orm-demo-lib';
import { Company } from './company.entity';
export declare class Person implements PersonDto {
    id: number;
    name: string;
    email: string;
    birth: Date;
    employeeType: EmployeeType;
    rank: number;
    active: boolean;
    note: string;
    company: Company;
}
