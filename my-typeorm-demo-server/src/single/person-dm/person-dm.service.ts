import { Injectable } from '@nestjs/common';
import { PersonDm } from './person-dm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * Service which doesn't inject custom repository.
 */
@Injectable()
export class PersonDmService {
  constructor(
    @InjectRepository(PersonDm)
    private repo: Repository<PersonDm>        // custom repository was not created explicitly, only injected repo from TypeOrm
  ) {}

  async get(id: number): Promise<PersonDm> {
    return this.repo.findOne(id);
  }

  async getAll(): Promise<PersonDm[]> {
    return this.repo.find();
  }

  async save(person: PersonDm): Promise<PersonDm> {
    console.log("PersonDmService.save()")
    return this.repo.save(person);
  }

  async delete(id: number) {
    this.repo.delete(id);
  }
}
