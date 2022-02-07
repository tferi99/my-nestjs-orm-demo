import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { OrmModule } from '../../orm/orm.module';

@Module({
  imports: [
    OrmModule
  ],
  providers: [
    CompanyService,
  ],
  controllers: [
    CompanyController,
  ],
  exports: [
    CompanyService
  ]
})
export class CompanyModule {}
