import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { UnderscoreNamingStrategy } from '@mikro-orm/core';

const logger = new Logger('MikroORM');

const ormConfig: MikroOrmModuleSyncOptions = {
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
};


@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
