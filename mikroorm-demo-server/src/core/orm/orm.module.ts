import { DynamicModule, Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrmController } from './orm.controller';
import { OrmUtilsService } from './service/orm-utils.service';
import { AnyEntity, EntityName } from '@mikro-orm/core';
import { BASE_ENTITIES } from './entity/base-entities';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import {
  ORM_CRUD_CONTROLLER_FEATURE_VALIDATOR,
  OrmCrudControllerFeatureValidatorService
} from './service/orm-crud-controller-feature-validator.service';

const logger = new Logger('MikroORM');

@Module({})
export class OrmModule {
  static forRoot(mikroOrmModuleSyncOptions: MikroOrmModuleSyncOptions, entities: EntityName<AnyEntity<any>>[]): DynamicModule {
    mikroOrmModuleSyncOptions.autoLoadEntities = false;
    mikroOrmModuleSyncOptions.entities = [...BASE_ENTITIES, ...entities];

    return {
      module: OrmModule,
      imports: [MikroOrmModule.forRoot(mikroOrmModuleSyncOptions), MikroOrmModule.forFeature({ entities })],
      providers: [
        OrmUtilsService,
        {
          provide: ORM_CRUD_CONTROLLER_FEATURE_VALIDATOR,
          useClass: OrmCrudControllerFeatureValidatorService,
        },
      ],
      controllers: [OrmController],
      exports: [
        MikroOrmModule,
        OrmUtilsService,
        ORM_CRUD_CONTROLLER_FEATURE_VALIDATOR
      ],
    };
  }
}
