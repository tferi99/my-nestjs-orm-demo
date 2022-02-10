import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { InitModule } from './init/init.module';
import { CompanyModule } from './features/company/company.module';
import { PersonModule } from './features/person/person.module';
import { SandboxModule } from './sandbox/sandbox.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './auth/user.service';
import { EVENT_MONITOR_CONFIG_OPTIONS, EventMonitorService } from './core/events/event-monitor.service';
import { LoggingConfig } from './config/logging.config';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    // features
    CompanyModule,
    PersonModule,
    SandboxModule,
    AuthModule,
    InitModule,
  ],
  controllers: [AppController],
  providers: [
    Logger, AppService, UserService,
  ],
})
export class AppModule {}
