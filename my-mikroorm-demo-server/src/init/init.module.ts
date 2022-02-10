import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { CompanyModule } from '../features/company/company.module';
import { PersonModule } from '../features/person/person.module';
import { InitController } from './init.controller';
import { ConfiguredOrmModule } from '../config/mikro-orm.config';
import { ConfiguredEventsModule } from '../config/events.config';

@Module({
  imports: [
    ConfiguredOrmModule(),
    CompanyModule,
    PersonModule,
    ConfiguredEventsModule()
  ],
  providers: [InitService],
  controllers: [InitController],
})
export class InitModule {}
