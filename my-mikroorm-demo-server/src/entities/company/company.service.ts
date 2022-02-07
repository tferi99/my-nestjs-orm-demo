import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Company } from './model/company.entity';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private repo: CompanyRepository,

    /*    @InjectRepository(Person)
    private personRepo: EntityRepository<Person>,        // custom repository was not created explicitly, only injected repo from TypeOrm*/

    private em: EntityManager,
  ) {}

  async get(id: number): Promise<Company> {
    return this.repo.findOne({ id });
  }

  async getAll(): Promise<Company[]> {
    return this.repo.findAll({}, { name: QueryOrder.ASC });
  }

  async create(dto: Company): Promise<Company> {
    const obj = this.repo.create(dto);
    delete obj.id;
    await this.repo.persistAndFlush(obj);
    return obj;
  }

  async update(id: number, dto: Company): Promise<Company> {
    const obj = await this.repo.findOne({ id });
    if (!obj) {
      return this.create(dto);
    }
    obj.assign(dto);
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

  async deleteAll() {
    this.repo.nativeDelete({});
  }
}
