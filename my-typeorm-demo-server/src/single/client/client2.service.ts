import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonDm } from '../person-dm/person-dm.entity';
import { Repository } from 'typeorm';
import { PersonDmRepository } from '../person-dm/person-dm.repository';

@Injectable()
export class Client2Service {
  constructor(
    private personDmRepo: PersonDmRepository
   ) { }

  async save(person: PersonDm): Promise<PersonDm> {
    console.log("Client2Service.save()")
    return this.personDmRepo.save(person);
  }

  async delete(id: number) {
    this.personDmRepo.delete(id);
  }

}
