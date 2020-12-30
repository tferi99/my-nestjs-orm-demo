import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private repo: Repository<Company>,        // custom repository was not created explicitly, only injected repo from TypeOrm

    @InjectRepository(Person)
    private personRepo: Repository<Person>        // custom repository was not created explicitly, only injected repo from TypeOrm
  ) {}

  async get(id: number): Promise<Company> {
    return this.repo.findOne(id);
  }

  async getAll(): Promise<Company[]> {
    return this.repo.find({
      order: {name: 'ASC'}
    });
  }

  async save(dto: Company): Promise<Company> {
    return this.repo.save(dto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }

  async saveWithPerson(dto: Company): Promise<Company> {
    const newItem = await this.repo.save(dto);
    if (dto.workers && dto.workers) {
      for (let p of dto.workers) {
        await this.personRepo.save(p);
      }
    }
    return this.repo.save(dto);
  }
}
