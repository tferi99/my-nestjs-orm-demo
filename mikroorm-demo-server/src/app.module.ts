import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { InitModule } from './init/init.module';
import { CompanyModule } from './features/company/company.module';
import { PersonModule } from './features/person/person.module';
import { SandboxModule } from './sandbox/sandbox.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './admin/user/user.service';
import { GlobalExceptionFilter } from './core/filter/global-exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    // features
    CompanyModule,
    PersonModule,
    SandboxModule,
    AuthModule,
    InitModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    // global error handling
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },

    // features
    UserService,
  ],
})
export class AppModule {
  constructor() {
    console.log('################# AppModule');
  }
}
