import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  imports: [
    OrmModule
  ],
  providers: [
    PersonService
  ],
  controllers: [
    PersonController
  ],
  exports: [
    PersonService
  ]
})
export class PersonModule {}
