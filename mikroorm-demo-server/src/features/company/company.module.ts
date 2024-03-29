import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { ConfiguredOrmModule } from '../../config/mikro-orm.config';
import { ConfiguredEventsModule } from '../../config/events.config';

@Module({
  imports: [ConfiguredOrmModule(), ConfiguredEventsModule()],
  providers: [],
  controllers: [CompanyController],
  exports: [],
})
export class CompanyModule {}
