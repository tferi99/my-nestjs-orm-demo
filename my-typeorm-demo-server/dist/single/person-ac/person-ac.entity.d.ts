import { BaseEntity } from 'typeorm';
import { PersonDto, EmployeeType } from 'my-ts-orm-demo-lib';
export declare class PersonAc extends BaseEntity implements PersonDto {
    id: number;
    name: string;
    email: string;
    birth: Date;
    employeeType: EmployeeType;
    rank: number;
    active: boolean;
    note: string;
}
