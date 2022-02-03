import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    CompanyModule
  ],
  providers: [InitService],
})
export class InitModule {}
