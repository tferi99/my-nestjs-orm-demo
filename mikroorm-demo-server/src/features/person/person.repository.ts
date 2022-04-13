import { Person } from './model/person.entity';
import { CrudEntityRepository, CrudEntityRepositoryConfig } from '../../core/orm/service/crud-entity-repository';
import { Company } from '../company/model/company.entity';

export class PersonRepository extends CrudEntityRepository<Person> {
  get config(): CrudEntityRepositoryConfig<Person> {
    const defaultConfig = super.config;
    return {
      ...defaultConfig,
      associatedParentEntities: [{ parentId: 'company', parentEntity: Company }],
    };
  }
}
