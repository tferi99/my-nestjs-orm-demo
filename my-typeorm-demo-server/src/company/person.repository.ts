import { Person } from './person.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  async getByName(name: string) {
    return this.findOne( name );
  }
}
