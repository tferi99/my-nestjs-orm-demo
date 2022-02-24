import { Repository } from '@mikro-orm/core';
import { Person } from './model/person.entity';
import { CrudEntityRepository, CrudEntityRepositoryConfig } from '../../core/orm/service/crud-entity-repository';
import { EntityData } from '@mikro-orm/core/typings';
import { Company } from '../company/model/company.entity';

@Repository(Person)
export class PersonRepository extends CrudEntityRepository<Person> {
  public config(): CrudEntityRepositoryConfig<Person> {
    return {
      pkName: 'id',
      autoIncrement: true,
    };
  }
}
