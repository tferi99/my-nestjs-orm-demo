import { DynamicModule, Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrmController } from './orm.controller';
import { OrmUtilsService } from './service/orm-utils.service';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { AnyEntity, EntityName } from '@mikro-orm/core';
import { BASE_ENTITIES } from './entity/base-entities';

const logger = new Logger('MikroORM');

@Module({})
export class OrmModule {
  static forRoot(mikroOrmModuleSyncOptions: MikroOrmModuleSyncOptions, entities: EntityName<AnyEntity<any>>[]): DynamicModule {
    mikroOrmModuleSyncOptions.autoLoadEntities = false;
    mikroOrmModuleSyncOptions.entities = [...BASE_ENTITIES, ...entities];

    return {
      module: OrmModule,
      imports: [MikroOrmModule.forRoot(mikroOrmModuleSyncOptions), MikroOrmModule.forFeature({ entities })],
      providers: [OrmUtilsService],
      controllers: [OrmController],
      exports: [MikroOrmModule, OrmUtilsService],
    };
  }
}
