import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository, QueryOrder, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Company } from './model/company.entity';
import { CompanyRepository } from './company.repository';
import { OrmCrudServiceBase } from '../../core/orm/service/orm-crud-service.base';

@Injectable()
export class CompanyService extends OrmCrudServiceBase<Company> {
  constructor(
    @InjectRepository(Company)
    private repo: CompanyRepository,
  ) {
    super();
  }

  getEntityRepository(): EntityRepository<Company> {
    return this.repo;
  }

  /*  constructor(
    @InjectRepository(Company)
    private repo: CompanyRepository,
    private em: EntityManager,
  ) {}

  async get(id: number): Promise<Company> {
    return this.repo.findOne({ id });
  }

  async getAll(): Promise<Company[]> {
    return this.repo.findAll({}, { name: QueryOrder.ASC });
  }

  async create(dto: Partial<Company>): Promise<Company> {
    const obj = this.repo.create(dto);
    delete obj.id;
    await this.repo.persistAndFlush(obj);
    return obj;
  }

  async update(id: number, dto: Partial<Company>): Promise<Company> {
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

  async deleteAll() {
    this.repo.nativeDelete({});
  }*/
}
