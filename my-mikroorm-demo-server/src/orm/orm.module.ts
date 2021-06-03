import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Company } from '../entities_SAVE/company.entity';
import { Person } from '../entities_SAVE/person.entity';

const logger = new Logger('MikroORM');

/*const ormConfig: MikroOrmModuleSyncOptions = {
  type: 'postgresql',
  dbName: 'mymikroormdemo',
  entitiesTs: ['./src/entities'],
  entities: ['./dist/entities'],
  autoLoadEntities: true,
  discovery: {
    warnWhenNoEntities: true
  },
  namingStrategy: UnderscoreNamingStrategy ,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger)
};*/


@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [Person, Company],
    }),

  ],
  exports: [
    MikroOrmModule
  ]
})
export class OrmModule {
}
