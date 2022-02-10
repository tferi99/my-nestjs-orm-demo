import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { AnyEntity, EntityName, UnderscoreNamingStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { logger } from '@mikro-orm/nestjs';
import { Company } from '../features/company/model/company.entity';
import { Person } from '../features/person/model/person.entity';
import { OrmModule } from '../core/orm/orm.module';
import { DynamicModule } from '@nestjs/common';

const AUTO_PRIMARY_KEY = true;

const ENTITIES: EntityName<AnyEntity<any>>[] = [Company, Person];

export const MIKRO_ORM_OPTIONS: MikroOrmModuleSyncOptions = {
  // registerRequestContext: false,       // by default enabled
  type: 'postgresql',
  dbName: 'mymikroormdemo',

  //  metadataProvider: TsMorphMetadataProvider,
  namingStrategy: UnderscoreNamingStrategy,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  discovery: {
    disableDynamicFileAccess: true, // required for Webpack - it forces ReflectMetadataProvider!
  },
  /**
   * From https://github.com/etienne-bechara/nestjs-orm
   * see more https://mikro-orm.io/docs/usage-with-nestjs/#using-asynclocalstorage-for-request-context
   */
  //context: (): EntityManager => ContextStorage.getStore()?.get(OrmStoreKey.ENTITY_MANAGER),
  //loadStrategy: LoadStrategy.JOINED
};

export const ConfiguredOrmModule = (): DynamicModule => {
  return OrmModule.forRoot(MIKRO_ORM_OPTIONS, ENTITIES);
};
