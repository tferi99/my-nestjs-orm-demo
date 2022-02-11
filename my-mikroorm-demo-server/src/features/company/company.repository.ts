import { Repository } from '@mikro-orm/core';
import { Company } from './model/company.entity';
import { CrudEntityRepository, CrudEntityRepositoryConfig } from '../../core/orm/service/crud-entity-repository';

@Repository(Company)
export class CompanyRepository extends CrudEntityRepository<Company> {}
