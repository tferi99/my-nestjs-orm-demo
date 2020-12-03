import { Injectable } from '@nestjs/common';
import { PersonDm } from './person-dm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonDmRepository } from './person-dm.repository';

/**
 * Service which doesn't inject custom repository.
 */
@Injectable()
export class PersonDm2Service {
  constructor(
    private repo: PersonDmRepository
  ) {}

  async save(person: PersonDm): Promise<PersonDm> {
    console.log("PersonDm2Service.save()")
    return this.repo.save(person);
  }

  async delete(id: number) {
    this.repo.delete(id);
  }
}
