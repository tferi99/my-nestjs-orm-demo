import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { logger } from '@mikro-orm/nestjs';

export default {
  type: 'postgresql',
  dbName: 'mymikroormdemo',
  entitiesTs: ['./src/entities'],
  entities: ['./dist/src/entities'],
  autoLoadEntities: true,
  discovery: {
    warnWhenNoEntities: true
  },
  namingStrategy: UnderscoreNamingStrategy ,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger)
};
