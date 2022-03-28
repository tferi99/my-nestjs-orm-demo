import { Controller } from '@nestjs/common';
import { Company } from './model/company.entity';
import { CompanyRepository } from './company.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventEmitterService } from '../../core/events/event-emitter.service';
import { OrmCrudControllerBase } from '../../core/orm/controller/orm-crud-controller.base';
import { CrudEntityRepository } from 'src/core/orm/service/crud-entity-repository';

@Controller('company')
export class CompanyController extends OrmCrudControllerBase<Company> {
  constructor(
    @InjectRepository(Company) private companyRepository: CompanyRepository,
    private eventEmitterService: EventEmitterService,
  ) {
    super(companyRepository, { orderBy: { name: 'ASC' } });
  }

  getRepository(): CrudEntityRepository<Company> {
    return this._repo;
  }
}
