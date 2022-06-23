import { Controller, Get, Query } from '@nestjs/common';
import { Company } from './model/company.entity';
import { CompanyRepository } from './company.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { OrmCrudControllerBase } from '../../core/orm/controller/orm-crud-controller.base';
import { FilterQuery, FindOptions } from '@mikro-orm/core';
import { Reflector } from '@nestjs/core';

@Controller('company')
export class CompanyController extends OrmCrudControllerBase<Company> {
  constructor(
    @InjectRepository(Company) private companyRepository: CompanyRepository,
    private reflector: Reflector
  ) {
    super({ repository: companyRepository, defaultGetAllOptions: { orderBy: { name: 'ASC' } } }, reflector);
  }

  @Get()
  async getAllFiltered(@Query() query): Promise<Company[]> {
    let filter: FilterQuery<Company>;
    if (query.name) {
      filter = { name: { $like: '%' + query.name + '%' } };
    }
    return super.getAll(filter);
  }
}
