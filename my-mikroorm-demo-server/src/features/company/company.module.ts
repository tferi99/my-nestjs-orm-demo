import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { OrmModule } from '../../core/orm/orm.module';
import { ConfiguredOrmModule } from '../../config/mikro-orm.config';

@Module({
  imports: [ConfiguredOrmModule()],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
