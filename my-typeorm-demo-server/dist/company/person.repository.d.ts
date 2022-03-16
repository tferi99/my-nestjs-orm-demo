import { Person } from './person.entity';
import { Repository } from 'typeorm';
export declare class PersonRepository extends Repository<Person> {
    getByName(name: string): Promise<Person>;
}
