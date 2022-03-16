import { DeleteResult } from 'typeorm';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
export declare class CompanyController {
    private service;
    constructor(service: CompanyService);
    getAll(): Promise<Company[]>;
    get(id: number): Promise<Company>;
    create(dto: Company): Promise<Company>;
    save(dto: Company): Promise<Company>;
    delete(id: number): Promise<DeleteResult>;
    saveWithPerson(dto: Company): Promise<Company>;
}
