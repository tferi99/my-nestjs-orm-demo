import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { logger } from '@mikro-orm/nestjs';
import { ENTITIES } from './entities';
import { BASE_ENTITIES } from '../orm/base-entities';

export const AUTO_PRIMARY_KEY = true;

export const MIKRO_ORM_OPTIONS: MikroOrmModuleSyncOptions = {
  // registerRequestContext: false,       // by default enabled
  type: 'postgresql',
  dbName: 'mymikroormdemo',
  autoLoadEntities: false,
  entities: [...BASE_ENTITIES, ...ENTITIES],

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
