import { Controller, Get, Query, Req } from '@nestjs/common';
import { Company } from './model/company.entity';
import { CompanyRepository } from './company.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { OrmCrudControllerBase } from '../../core/orm/controller/orm-crud-controller.base';
import { FilterQuery } from '@mikro-orm/core';
import { Features } from '../../core/orm/controller/features.decorator';

@Controller('company')
@Features({
  get: true,
  getAll: true,
  getAllFiltered: true,
  update: true,
  nativeUpdate: true,
  insert: true,
  delete: true,
  nativeDelete: true,
})
export class CompanyController extends OrmCrudControllerBase<Company> {
  constructor(
    @InjectRepository(Company) private companyRepository: CompanyRepository
  ) {
    super({ repository: companyRepository, defaultGetAllOptions: { orderBy: { name: 'ASC' } } });
  }

  @Get()
  async getAllFiltered(@Req() req: Request, @Query() query): Promise<Company[]> {
    console.log('--> CompanyController.getAll() - query: ', query);
    let filter: FilterQuery<Company>;
    if (query.name) {
      filter = { name: { $like: '%' + query.name + '%' } };
    }
    console.log('Calling super - filter:', filter);
    return super.getAll(req, filter);
  }
}
