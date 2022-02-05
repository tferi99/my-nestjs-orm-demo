import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { CompanyRepository } from '../entities/company/company.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Company } from '../entities/company/model/company.entity';
import { EntityManager } from '@mikro-orm/core';
import { OrmUtils } from '../orm/orm-utils';

@Injectable()
export class SandboxService {
  private readonly logger = new Logger(SandboxService.name);

  constructor(
    private em: EntityManager,
    @InjectRepository(Company) private companyRepository: CompanyRepository,
  ) {}

  async emDumpWithFind() {
    OrmUtils.dumpUnitOfWork(this.em, 'start');
    const companies = await this.companyRepository.find({});
    OrmUtils.dumpUnitOfWork(this.em, 'after find');
  }
}
