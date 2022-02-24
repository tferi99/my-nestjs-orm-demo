import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { Company } from '../features/company/model/company.entity';
import { CompanyRepository } from '../features/company/company.repository';
import { EntityManager } from '@mikro-orm/core';
import { OrmUtilsService } from '../core/orm/service/orm-utils.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PersonRepository } from '../features/person/person.repository';
import { Person } from '../features/person/model/person.entity';
import { DateTimeUtils, DurationUnit } from '@app/client-lib/util/datetime-utils';
import { EmployeeType } from '../features/person/model/employee-type';
import { EventEmitterService } from '../core/events/event-emitter.service';

/**
 * Initialization service. It started as a task during startup.
 * If initialization completed it emits event.
 */
@Injectable()
export class InitService {
  private readonly logger = new Logger(InitService.name);

  constructor(
    private em: EntityManager,
    //private companyService: CompanyService,
    @InjectRepository(Company)
    private companyRepository: CompanyRepository,
    @InjectRepository(Person)
    private personRepository: PersonRepository,
    private eventEmitterService: EventEmitterService,
  ) {}

  @Timeout(500)
  async initApplication() {
    this.logger.log('============================ Application initialization ============================');
    this.initDbContent();
    this.eventEmitterService.emit({
      id: 'app.initialized',
    });
  }

  async clean() {
    this.logger.log('============================ Application clean ============================');
    //OrmUtils.dumpUnitOfWork(this.em, '>>>>>>>>>>>>>>>>>>>>> CLEAN');
    this.em.transactional(async (em) => {
      await this.personRepository.nativeDelete({});
      await this.companyRepository.nativeDelete({});
    });
  }

  /**
   * It creates 2 default users if no user created yet.
   */
  async initDbContent() {
    //const companies = await this.companyService.getAll();
    const companies = await this.companyRepository.find({});
    if (companies.length > 0) {
      return; // inited
    }

    //OrmUtils.dumpUnitOfWork(em, '>>>>>>>>>>>>>>>>>>>>> START');
    await this.em.transactional(async (em) => {
      const c: Company = new Company({ name: 'Abc Inc.', established: new Date(), active: true });
      em.persist(c);
      const c2: Company = new Company({ name: 'Other Inc.', established: new Date(), active: false });
      c2.active = true;

      const birth = new Date(Date.now() - DateTimeUtils.durationAsMilliseconds(10, DurationUnit.Years));
      const p1 = new Person({ name: 'John Smith', email: 'js@test.org', birth, employeeType: EmployeeType.MANAGER, rank: 5 });
      const p2 = new Person({ name: 'Jane Doe', email: 'jd@test.org', birth, employeeType: EmployeeType.WORKER, rank: 1 });
      c2.workers.add(p1);
      c2.workers.add(p2);

      em.persist(c2);
      em.persist(p1);
      em.persist(p2);
    });
  }

  async addCompany1(em: EntityManager) {
    console.log('addCompany1');
    await em.begin();
    try {
      const c: Company = new Company();
      c.name = 'Abc Inc.';
      c.established = new Date();
      c.active = true;
      //this.companyRepository.persist(c);
      em.persist(c);
      console.log(`Created [${c.id}]`);

      await em.commit();
    } catch (e) {
      //      await em.rollback();
      throw e;
    }
  }

  async addCompany2(em: EntityManager) {
    console.log('addCompany2');
    await em.transactional(async (em) => {
      const c: Company = new Company();
      c.name = 'Other Inc.';
      c.established = new Date();
      c.active = true;
      em.persist(c);
    });
  }

  dumpEm() {
    OrmUtilsService.dumpUnitOfWork(this.em, 'DUMP');
  }
}
