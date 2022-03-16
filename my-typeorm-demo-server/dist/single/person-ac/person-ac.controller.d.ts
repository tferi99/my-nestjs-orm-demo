import { PersonAcService } from './person-ac.service';
import { PersonAc } from './person-ac.entity';
export declare class PersonAcController {
    private service;
    constructor(service: PersonAcService);
    save(p: PersonAc): Promise<PersonAc>;
    delete(id: number): Promise<void>;
}
