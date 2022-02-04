import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { Company } from '../company/model/company.entity';
import { Person } from '../person/model/person.entity';
import { DateTimeUtils, DurationUnit } from '../util/datetime-util';
import { PersonService } from '../person/person.service';
import { CompanyRepository } from '../company/company.repository';
import { EntityManager } from '@mikro-orm/core';
import { EmployeeType } from '../person/model/employee-type';
import { OrmUtils } from '../orm/orm-utils';
import { InjectRepository } from '@mikro-orm/nestjs';


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
    private personService: PersonService,
  ) {}

  @Timeout(500)
  async initApplication() {
    this.logger.log('============================ Application initialization ============================');
    this.initDbContent();
  }

  async clean() {
    this.logger.log('============================ Application clean ============================');
    this.em.transactional(async (em) => {
      await this.personService.deleteAll();
      await this.companyRepository.nativeDelete({});
      //this.companyService.deleteAll();
    });
  }

  /**
   * It creates 2 default users if no user created yet.
   */
  async initDbContent() {
    //const companies = await this.companyService.getAll();
    const companies = await this.companyRepository.find({});
    if (companies.length > 0) {
      console.log('INITED');
      return; // inited
    }

    console.log('EMPTY >>>>>>>>>>>>>>>');
    //const em = this.em.fork(false);
    const em = this.em.fork(true);
    //const em = this.em;

    await this.addCompany1(em);
    await this.addCompany2(em);

/*    await em.begin();
    try {
      const c: Company = new Company();
      c.name = 'Abc Inc.';
      c.established = new Date();
      c.active = true;
      this.companyRepository.persist(c);
      //em.persist(c);

      console.log('-------------- em --------------');
      OrmUtils.dumpUnitOfWork(em);
      console.log('-------------- em from repo -------------- ');
      OrmUtils.dumpUnitOfWork(this.companyRepository.getEm());

      await em.commit();
    } catch (e) {
      await em.rollback();
      throw e;
    }*/

    // only a company
/*    const c: Company = new Company();
    c.name = 'Abc Inc.';
    c.established = new Date();
    c.active = true;
    //await this.companyService.save(c)
    await this.companyRepository.persist(c);*/

    // company with workers
/*    const c2: Company = new Company();
    c2.name = 'Other Inc.';
    c2.established = new Date();
    c2.active = true;

    const p1 = new Person();
    p1.name = 'John Smith';
    p1.email = 'js@test.org';
    p1.rank = 5;
    p1.employeeType = EmployeeType.MANAGER;
    p1.birth = new Date(Date.now() - DateTimeUtils.durationAsMilliseconds(10, DurationUnit.Years));

    c2.workers.add(p1);
    await this.companyRepository.persistAndFlush(c2);*/
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

/*      console.log('-------------- em --------------');
      OrmUtils.dumpUnitOfWork(em);
      console.log('-------------- em from repo -------------- ');
      OrmUtils.dumpUnitOfWork(this.companyRepository.getEm());*/

      await em.commit();
    } catch (e) {
      await em.rollback();
      throw e;
    }
  }

  async addCompany2(em: EntityManager) {
    console.log('addCompany2');
    await em.transactional(async em => {
      const c: Company = new Company();
      c.name = 'Abc2 Inc.';
      c.established = new Date();
      c.active = true;
      em.persist(c);
    });
  }

}
