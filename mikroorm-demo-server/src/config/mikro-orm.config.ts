import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { AnyEntity, EntityName, UnderscoreNamingStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { logger } from '@mikro-orm/nestjs';
import { Company } from '../features/company/model/company.entity';
import { Person } from '../features/person/model/person.entity';
import { OrmModule } from '../core/orm/orm.module';
import { DynamicModule } from '@nestjs/common';

export const ENTITIES: EntityName<AnyEntity<any>>[] = [Company, Person];

export const GET_MIKRO_ORM_OPTIONS = (): MikroOrmModuleSyncOptions => {
  const dbUser = process.env.DATABASE_USER;
  if (!dbUser) {
    throw new Error('No DATABASE_USER specified in .env or .env not found');
  }
  console.log('Database user: ', dbUser);
  return {
    // registerRequestContext: false,       // by default enabled
    type: 'postgresql',
    dbName: 'mynestjsormdemo',
    user: dbUser,
    password: process.env.DATABASE_PASSWORD,

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
};

/**
 * It's just a shortcut to avoid copy-paste.
 */
export const ConfiguredOrmModule = (): DynamicModule => {
  return OrmModule.forRoot(GET_MIKRO_ORM_OPTIONS(), ENTITIES);
};
