import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [
    OrmModule
  ],
  providers: [
    CompanyService,
    PersonService
  ],
  controllers: [
    CompanyController,
    PersonController
  ]
})
export class CompanyModule {}
