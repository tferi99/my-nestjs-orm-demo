import { Repository } from 'typeorm';
import { Company } from './company.entity';
export declare class CompanyRepository extends Repository<Company> {
    getByName(name: string): Promise<Company>;
}
