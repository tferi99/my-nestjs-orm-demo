import { Company } from './model/company.entity';
import { CrudEntityRepository } from '../../core/orm/service/crud-entity-repository';
import { FilterQuery } from '@mikro-orm/core';

export class CompanyRepository extends CrudEntityRepository<Company> {
  getEmptyFilterQuery(): FilterQuery<Company> {
    return {};
  }
}
