import { CompanyDto } from 'my-ts-orm-demo-lib';
import { Person } from './person.entity';
export declare class Company implements CompanyDto {
    id: number;
    name: string;
    established: Date;
    active: boolean;
    note: string;
    workers: Person[];
}
