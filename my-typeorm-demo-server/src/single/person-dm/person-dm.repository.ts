import { PersonDm } from './person-dm.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Name } from '../../common/name';

@EntityRepository(PersonDm)
export class PersonDmRepository extends Repository<PersonDm> {
  async getByName(name: string) {
    return this.findOne( name );
  }
}
