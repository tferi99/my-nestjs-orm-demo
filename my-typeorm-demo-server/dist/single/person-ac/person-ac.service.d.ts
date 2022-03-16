import { PersonAc } from './person-ac.entity';
export declare class PersonAcService {
    save(person: PersonAc): Promise<PersonAc>;
    delete(id: number): Promise<void>;
}
