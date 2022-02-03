import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { OrmModule } from './orm/orm.module';
import { PersonModule } from './person/person.module';
import { InitModule } from './init/init.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    // features
    OrmModule,
    InitModule,
    CompanyModule,
    PersonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
