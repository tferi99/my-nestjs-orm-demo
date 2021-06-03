import { Injectable } from '@nestjs/common';
import { Person } from '../entities_SAVE/person.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { createWaitPromise } from '../common/AsyncUtil';
import { MikroOrmCrudServiceBase } from '../common/services/MikroOrmCrudServiceBase';

const waitForTest = (cb, ms) => new Promise(() => setTimeout(cb, ms));

/**
 * Service which doesn't inject custom repository.
 */
@Injectable()
/*export class PersonService extends MikroOrmCrudServiceBase<Person, 'id'> {
  constructor(
    @InjectRepository(Person)
    private repo: EntityRepository<Person>,        // custom repository was not created explicitly, only injected repo from TypeOrm
    private em: EntityManager
  ) {
    //super();
  }

  //-------------------- abstract ------------------------
  getEntityRepository(): EntityRepository<Person> {
    return this.repo;
  }

  newEntity(): Person {
    return new Person();
  }
}*/

export class PersonService {
  constructor(
    @InjectRepository(Person)
    private repo: EntityRepository<Person>,        // custom repository was not created explicitly, only injected repo from TypeOrm
    private em: EntityManager
  ) {}

  async get(id: number): Promise<Person> {
    return this.repo.findOne(id);
  }

  async getAll(): Promise<Person[]> {
    return this.repo.findAll({}, { name: QueryOrder.ASC });
  }

  async create(dto: Person): Promise<Person> {
    const obj = new Person();
    wrap(obj).assign(dto);
    await this.repo.persistAndFlush(obj);
    return obj;
  }

  async update(id: number, dto: Person): Promise<Person> {
    return null;
  }

  async delete(id: number): Promise<void> {
    //return this.em.nativeDelete(Person, { id });

//    return createWaitPromise(
//      () => this.em.nativeDelete(Person, { id }),
//      2000,
//      3000
//    );
    return this.repo.removeAndFlush({id});
  }
}
