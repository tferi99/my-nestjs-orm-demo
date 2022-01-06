import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { logger, MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { ENTITIES } from './orm/entities';

export const MIKRO_ORM_OPTIONS: MikroOrmModuleSyncOptions = {
  type: 'postgresql',
  dbName: 'mymikroormdemo',
  entities: ENTITIES,
  //  metadataProvider: TsMorphMetadataProvider,
  namingStrategy: UnderscoreNamingStrategy ,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  discovery: {
    disableDynamicFileAccess: true, // required for Webpack - it forces ReflectMetadataProvider!
  },
  //loadStrategy: LoadStrategy.JOINED
};
