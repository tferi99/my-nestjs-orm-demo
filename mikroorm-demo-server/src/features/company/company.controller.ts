import { Controller } from '@nestjs/common';
import { Company } from './model/company.entity';
import { CompanyRepository } from './company.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { OrmCrudControllerBase } from '../../core/orm/controller/orm-crud-controller.base';

@Controller('company')
export class CompanyController extends OrmCrudControllerBase<Company> {
  constructor(@InjectRepository(Company) private companyRepository: CompanyRepository) {
    super({ repository: companyRepository, defaultGetAllOptions: { orderBy: { name: 'ASC' } } });
  }
}
