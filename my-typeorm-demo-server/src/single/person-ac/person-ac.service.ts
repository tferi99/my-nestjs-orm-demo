import { Injectable } from '@nestjs/common';
import { PersonAc } from './person-ac.entity';

@Injectable()
export class PersonAcService {

  async save(person: PersonAc): Promise<PersonAc> {
    const newPerson = PersonAc.create(person);
    return newPerson.save();
  }

  async delete(id: number) {
    PersonAc.delete(id);
  }
}
