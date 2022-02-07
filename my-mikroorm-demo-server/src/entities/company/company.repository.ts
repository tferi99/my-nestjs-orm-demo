import { EntityRepository, Repository } from '@mikro-orm/core';
import { Company } from './model/company.entity';

@Repository(Company)
export class CompanyRepository extends EntityRepository<Company> {}
/*  getEm(): EntityManager {
    return this._em;
  }
}
*/
