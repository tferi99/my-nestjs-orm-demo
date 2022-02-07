import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { OrmUtils } from './orm-utils';

@Injectable()
export class OrmService {
  private readonly logger = new Logger(OrmService.name);

  constructor(
    private em: EntityManager,
  ) {}

  dumpEm(label = 'DUMP') {
    OrmUtils.dumpUnitOfWork(this.em, label);
  }

  emClear() {
    this.logger.log('EM clear');
    this.em.clear();
  }
}
