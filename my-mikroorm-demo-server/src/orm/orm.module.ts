import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Company } from './entities/company.entity';
import { Person } from './entities/person.entity';
import { ENTITIES } from './entities';
import { MIKRO_ORM_OPTIONS } from '../mikro-orm.config';

const logger = new Logger('MikroORM');

@Module({
  imports: [
    MikroOrmModule.forRoot(MIKRO_ORM_OPTIONS),
    MikroOrmModule.forFeature({
      entities: ENTITIES,
    }),

  ],
  exports: [
    MikroOrmModule
  ]
})
export class OrmModule {
}
