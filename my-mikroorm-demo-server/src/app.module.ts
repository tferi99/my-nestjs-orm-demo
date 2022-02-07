import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { OrmModule } from './orm/orm.module';
import { InitModule } from './init/init.module';
import { CompanyModule } from './entities/company/company.module';
import { PersonModule } from './entities/person/person.module';
import { SandboxModule } from './sandbox/sandbox.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './auth/user.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    // features
    OrmModule,
    CompanyModule,
    PersonModule,
    SandboxModule,
    AuthModule,
    InitModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService, UserService],
})
export class AppModule {}
