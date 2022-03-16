import { Person } from './person.entity';
import { PersonService } from './person.service';
import { DeleteResult } from 'typeorm';
export declare class PersonController {
    private service;
    constructor(service: PersonService);
    getAll(): Promise<Person[]>;
    get(id: number): Promise<Person>;
    create(p: Person): Promise<Person>;
    save(p: Person): Promise<Person>;
    delete(id: number): Promise<DeleteResult>;
    dummy(): Person;
}
