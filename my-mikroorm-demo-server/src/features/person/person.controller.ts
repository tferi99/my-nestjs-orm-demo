import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Person } from './model/person.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventEmitterService } from '../../core/events/event-emitter.service';
import { PersonRepository } from './person.repository';
import { OrmCrudControllerBase } from '../../core/orm/controller/orm-crud-controller.base';
import { CrudEntityRepository } from '../../core/orm/service/crud-entity-repository';
import { Company } from '../company/model/company.entity';
import { CompanyRepository } from '../company/company.repository';

@Controller('person')
export class PersonController extends OrmCrudControllerBase<Person> {
  constructor(
    @InjectRepository(Person) private repo: PersonRepository,
    @InjectRepository(Company) private companyRepo: CompanyRepository,
    private eventEmitterService: EventEmitterService,
  ) {
    super({ orderBy: { name: 'ASC' } });
  }

  getRepository(): CrudEntityRepository<Person> {
    return this.repo;
  }

  @Post('company/:companyId')
  async insertForCompany(@Body() data: Person, @Param('companyId', ParseIntPipe) companyId: number): Promise<Person> {
    const company: Company = this.companyRepo.getReference(companyId);
    const obj = await this.repo.crud().insertForParent(data, 'company', company);
    await this.repo.flush();
    return obj;
  }
}
