import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonDm } from '../person-dm/person-dm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(PersonDm)
    private personDmRepo: Repository<PersonDm>        // this repository was not created explicitly, only injected as repo
   ) { }

  async save(person: PersonDm): Promise<PersonDm> {
    console.log("ClientService.save()")
    return this.personDmRepo.save(person);
  }

  async delete(id: number) {
    this.personDmRepo.delete(id);
  }

}
