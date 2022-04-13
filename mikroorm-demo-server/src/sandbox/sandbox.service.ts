import { Injectable, Logger } from '@nestjs/common';
import { CompanyRepository } from '../features/company/company.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Company } from '../features/company/model/company.entity';
import { OrmUtilsService } from '../core/orm/service/orm-utils.service';
import { Person } from '../features/person/model/person.entity';
import {
  DateTimeUtils,
  DurationUnit,
} from '@app/client-lib/util/datetime-utils';
import { EntityManager, QueryBuilder } from '@mikro-orm/postgresql';
import { EmployeeType } from '@app/client-lib';

@Injectable()
export class SandboxService {
  private readonly logger = new Logger(SandboxService.name);

  constructor(
    private em: EntityManager,
    @InjectRepository(Company) private companyRepository: CompanyRepository,
  ) {}

  async emDumpWithFind() {
    OrmUtilsService.dumpUnitOfWork(this.em, 'start');
    const companies = await this.companyRepository.find({});
    OrmUtilsService.dumpUnitOfWork(this.em, 'after find');
  }

  async manyToOneOptional(assignToCompany: boolean) {
    this.em.transactional(async (em) => {
      const birth = new Date(
        Date.now() -
          DateTimeUtils.durationAsMilliseconds(15, DurationUnit.Years),
      );
      const p = new Person({
        name: 'Jane Doe',
        email: 'jd@test.org',
        birth,
        employeeType: EmployeeType.DIRECTOR,
        rank: 1,
      });
      em.persist(p);

      /*      const qb = this.em.createQueryBuilder(Company);
      qb.update({ name: 'test 123', type: PublisherType.GLOBAL }).where({ id: 123, type: PublisherType.LOCAL });*

 */

      const qb = this.em.createQueryBuilder(Company);
      const companyIdRes = await qb.select('min(id)').execute(); // result is an array of fields
      console.log('Min ID of Company: ', companyIdRes);
      if (assignToCompany) {
        const companyId: number = companyIdRes[0]['min'];
        if (companyId !== null) {
          const c = this.companyRepository.getReference(companyId);
          p.company = c;
          this.logger.debug('ASSIGNED');
        } else {
          this.logger.debug('NO COMPANY FOUND');
        }
      }
    });
  }
}
