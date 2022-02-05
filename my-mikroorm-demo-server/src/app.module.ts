import { Logger, Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { OrmModule } from './orm/orm.module';
import { InitModule } from './init/init.module';
import { CompanyModule } from './entities/company/company.module';
import { PersonModule } from './entities/person/person.module';
import { SandboxModule } from './sandbox/sandbox.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    // features
    OrmModule,
    InitModule,
    CompanyModule,
    PersonModule,
    SandboxModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService
  ],
})
export class AppModule {}
