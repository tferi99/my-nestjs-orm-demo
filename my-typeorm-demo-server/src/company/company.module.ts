import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { Company } from './company.entity';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Person])
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
