import { Person } from './person.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
export declare class PersonService {
    private repo;
    constructor(repo: Repository<Person>);
    get(id: number): Promise<Person>;
    getAll(): Promise<Person[]>;
    save(person: Person): Promise<Person>;
    delete(id: number): Promise<DeleteResult>;
}
