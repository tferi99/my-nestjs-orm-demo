import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ENTITIES } from '../config/entities';
import { MIKRO_ORM_OPTIONS } from '../config/mikro-orm-options';
import { OrmController } from './orm.controller';
import { OrmUtilsService } from './service/orm-utils.service';

const logger = new Logger('MikroORM');

@Module({
  imports: [
    MikroOrmModule.forRoot(MIKRO_ORM_OPTIONS),
    MikroOrmModule.forFeature({
      entities: ENTITIES,
    }),
  ],
  providers: [OrmUtilsService],
  controllers: [OrmController],
  exports: [MikroOrmModule, OrmUtilsService],
})
export class OrmModule {}
