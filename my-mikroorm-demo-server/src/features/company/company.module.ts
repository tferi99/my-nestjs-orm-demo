import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { OrmModule } from '../../core/orm/orm.module';
import { ConfiguredOrmModule } from '../../config/mikro-orm.config';
import { ConfiguredEventsModule } from '../../config/events.config';

@Module({
  imports: [
    ConfiguredOrmModule(),
    ConfiguredEventsModule()
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
