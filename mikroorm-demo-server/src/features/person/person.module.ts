import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { ConfiguredOrmModule } from '../../config/mikro-orm.config';
import { ConfiguredEventsModule } from '../../config/events.config';

@Module({
  imports: [
    ConfiguredOrmModule(),
    ConfiguredEventsModule(),
  ],
  providers: [PersonService],
  controllers: [PersonController],
  exports: [PersonService],
})
export class PersonModule {}
