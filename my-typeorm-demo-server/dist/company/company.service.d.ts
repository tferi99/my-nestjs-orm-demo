import { Person } from './person.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Company } from './company.entity';
export declare class CompanyService {
    private repo;
    private personRepo;
    constructor(repo: Repository<Company>, personRepo: Repository<Person>);
    get(id: number): Promise<Company>;
    getAll(): Promise<Company[]>;
    save(dto: Company): Promise<Company>;
    delete(id: number): Promise<DeleteResult>;
    saveWithPerson(dto: Company): Promise<Company>;
}
