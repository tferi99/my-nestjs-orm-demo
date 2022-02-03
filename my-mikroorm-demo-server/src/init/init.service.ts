import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company.entity';

/**
 * Initialization service. It started as a task during startup.
 * If initialization completed it emits event.
 */
@Injectable()
export class InitService {
  private readonly logger = new Logger(InitService.name);

  constructor(
    private companyService: CompanyService,
  ) {}

  @Timeout(500)
  async initApplication() {
    this.logger.log('============================ Application initialization ============================');
    this.initDbContent();
  }

  /**
   * It creates 2 default users if no user created yet.
   */
  async initDbContent() {
    const companies = await this.companyService.getAll();
    if (companies.length > 0) {
      return; // inited
    }

    const c: Company = new Company();
    c.name = 'Abc Inc.';
    c.established = new Date();
    c.active = true;
    await this.companyService.save(c);
  }
}
