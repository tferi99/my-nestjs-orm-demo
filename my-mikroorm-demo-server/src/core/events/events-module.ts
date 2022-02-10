import { DynamicModule, Module } from '@nestjs/common';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs/typings';
import { AnyEntity, EntityName } from '@mikro-orm/core';
import { BASE_ENTITIES } from '../orm/entity/base-entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrmUtilsService } from '../orm/service/orm-utils.service';
import { OrmController } from '../orm/orm.controller';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { EVENT_MONITOR_CONFIG_OPTIONS, EventMonitorService } from './event-monitor.service';
import { EventEmitterService } from './event-emitter.service';
import { LoggingConfig } from '../../config/logging.config';

@Module({})
export class EventsModule {
  static forRoot(monitorLoggerConfig?: WinstonModuleOptions): DynamicModule {
    const dynamicProviders: Provider[] = [];

    // event monitor
    if (monitorLoggerConfig) {
      dynamicProviders.push({
        provide: EVENT_MONITOR_CONFIG_OPTIONS,
        useValue: monitorLoggerConfig,
      });
      dynamicProviders.push(EventMonitorService);
    }

    return {
      module: EventsModule,
      imports: [],
      providers: [EventEmitterService, ...dynamicProviders],
      controllers: [],
      exports: [EventEmitterService],
    };
  }
}
