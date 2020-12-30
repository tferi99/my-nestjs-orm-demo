import { Injectable } from '@nestjs/common';
import { Person } from './person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

/**
 * Service which doesn't inject custom repository.
 */
@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private repo: Repository<Person>        // custom repository was not created explicitly, only injected repo from TypeOrm
  ) {}

  async get(id: number): Promise<Person> {
    return this.repo.findOne(id);
  }

  async getAll(): Promise<Person[]> {
    return this.repo.find({
      order: {name: 'ASC'}
    });
  }

  async save(person: Person): Promise<Person> {
    return this.repo.save(person);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
