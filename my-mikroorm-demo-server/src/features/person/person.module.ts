import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { ConfiguredOrmModule } from '../../config/mikro-orm.config';

@Module({
  imports: [ConfiguredOrmModule()],
  providers: [PersonService],
  controllers: [PersonController],
  exports: [PersonService],
})
export class PersonModule {}
