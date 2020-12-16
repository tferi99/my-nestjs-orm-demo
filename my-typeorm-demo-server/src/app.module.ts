import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmConfig } from './config/typeorm.config';
import { PersonAcModule } from './single/person-ac/person-ac.module';
import { PersonModule } from './single/person/person.module';
import { CompanyModule } from './single/company/company.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(createTypeOrmConfig()),
    PersonAcModule,
    PersonModule,
    CompanyModule
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
