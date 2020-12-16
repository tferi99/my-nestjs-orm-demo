import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../person/person.entity';
import { Company } from './company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company])
  ],
  providers: [
    CompanyService
  ],
  controllers: [
    CompanyController
  ]
})
export class CompanyModule {}
