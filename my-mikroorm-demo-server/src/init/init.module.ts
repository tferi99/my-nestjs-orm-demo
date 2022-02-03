import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { CompanyModule } from '../company/company.module';
import { PersonModule } from '../person/person.module';
import { InitController } from './init.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [
    OrmModule,
    CompanyModule,
    PersonModule
  ],
  providers: [InitService],
  controllers: [
    InitController
  ]
})
export class InitModule {}
