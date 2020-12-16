import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../person/person.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private repo: Repository<Company>        // custom repository was not created explicitly, only injected repo from TypeOrm
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
}
