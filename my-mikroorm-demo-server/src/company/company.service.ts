import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private repo: EntityRepository<Company>,        // custom repository was not created explicitly, only injected repo from TypeOrm

/*    @InjectRepository(Person)
    private personRepo: EntityRepository<Person>,        // custom repository was not created explicitly, only injected repo from TypeOrm*/

    private em: EntityManager
  ) {}

  async get(id: number): Promise<Company> {
    return this.repo.findOne(id);
  }

  async getAll(): Promise<Company[]> {
    return this.repo.findAll({}, { name: QueryOrder.ASC });
  }

  async save(dto: Company): Promise<Company> {
    const obj = new Company();
    wrap(obj).assign(dto);
    await this.repo.persistAndFlush(obj);
    return obj;
  }

  async delete(id: number): Promise<void> {
    this.em.nativeDelete(Company, { id });
  }

  async saveWithPerson(dto: Company): Promise<Company> {
/*    const newItem = await this.repo.save(dto);
    if (dto.workers && dto.workers) {
      for (let p of dto.workers) {
        await this.personRepo.save(p);
      }
    }
    return this.repo.save(dto);*/
    return null;
  }
}
