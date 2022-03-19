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
      // unemployed
      const p1 = new Person({ name: 'Tim Cook', email: 'tc@test.org', birth: this.yearsBefore(51), employeeType: EmployeeType.WORKER, rank: 0 });
      const p2 = new Person({ name: 'Mary Teresa Barra', email: 'mtb@test.org', birth: this.yearsBefore(60), employeeType: EmployeeType.DIRECTOR, rank: 0 });
      const p3 = new Person({ name: 'Barbara Smith', email: 'bs@test.org', birth: this.yearsBefore(41), employeeType: EmployeeType.WORKER, rank: 0 });
      em.persist(p1);
      em.persist(p2);
      em.persist(p3);

      // c1
      const c1: Company = new Company({ name: 'Abc Inc.', established: new Date(), active: false });
      em.persist(c1);

      // c2
      const c2: Company = new Company({ name: 'Other Inc.', established: new Date(), active: true });
      const p21 = new Person({ name: 'John Smith', email: 'js@test.org', birth: this.yearsBefore(31), employeeType: EmployeeType.MANAGER, rank: 5 });
      const p22 = new Person({ name: 'Jane Doe', email: 'jd@test.org', birth: this.yearsBefore(24), employeeType: EmployeeType.WORKER, rank: 1, active: false });
      c2.workers.add(p21);
      c2.workers.add(p22);
      em.persist(c2);
      em.persist(p21);
      em.persist(p22);

      // c3
      const c3: Company = new Company({ name: 'Microsoft', established: new Date(1975, 4, 4), active: true });
      const p31 = new Person({ name: 'Bill Gates', email: 'bg@ms.com', birth: new Date(1955, 10, 28), employeeType: EmployeeType.DIRECTOR, rank: 50, active: false });
      const p32 = new Person({ name: 'Paul Allen', email: 'pa@ms.com', birth: new Date(1953, 1, 21), employeeType: EmployeeType.MANAGER, rank: 40, active: false });
      c3.workers.add(p31);
      c3.workers.add(p32);
      em.persist(c3);

      const c4: Company = new Company({ name: 'Apple Inc.', established: new Date(1976, 4, 1), active: true });
      const p41 = new Person({ name: 'Steve Jobs', email: 'sj@apple.com', birth: new Date(1955, 2, 24), employeeType: EmployeeType.DIRECTOR, rank: 50, active: false });
      const p42 = new Person({ name: 'Steve Wozniak', email: 'sw@apple.com', birth: new Date(1950, 8, 11), employeeType: EmployeeType.ARCHITECT, rank: 39, active: false });
      const p43 = new Person({ name: 'Timothy D. Cook', email: 'tdc@apple.com', birth: new Date(1960, 11, 1), employeeType: EmployeeType.ARCHITECT, rank: 39 });
      c4.workers.add(p41);
      c4.workers.add(p42);
      c4.workers.add(p43);
      em.persist(c4);
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

  private yearsBefore(years: number): Date {
    return new Date(Date.now() - DateTimeUtils.durationAsMilliseconds(years, DurationUnit.Years));
  }
}
