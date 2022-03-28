import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Person } from './model/person.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PersonRepository } from './person.repository';
import { OrmCrudControllerBase } from '../../core/orm/controller/orm-crud-controller.base';
import { CrudEntityRepository } from '../../core/orm/service/crud-entity-repository';
import { Company } from '../company/model/company.entity';
import { CompanyRepository } from '../company/company.repository';

@Controller('person')
export class PersonController extends OrmCrudControllerBase<Person> {
  constructor(
    @InjectRepository(Person) private personRepository: PersonRepository,
    @InjectRepository(Company) private companyRepo: CompanyRepository
  ) {
    super(personRepository, { orderBy: { name: 'ASC' } });
  }

  /**
   * Inserting for a parent already supported by {@link CrudEntityRepository}
   * if you specify parents in {@link CrudEntityRepository.config()}
   *
   * @param data
   * @param companyId
   */
  @Post('company/:companyId')
  async insertForCompany(@Body() data: Person, @Param('companyId', ParseIntPipe) companyId: number): Promise<Person> {
    const company: Company = this.companyRepo.getReference(companyId);
    const obj = await this._repo.crud.insertForParent(data, 'company', company);
    await this._repo.flush();
    return obj;
  }
}
