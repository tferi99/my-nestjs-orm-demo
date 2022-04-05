import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { ConfiguredOrmModule } from '../../config/mikro-orm.config';
import { ConfiguredEventsModule } from '../../config/events.config';

@Module({
  imports: [ConfiguredOrmModule(), ConfiguredEventsModule()],
  providers: [],
  controllers: [PersonController],
  exports: [],
})
export class PersonModule {}
