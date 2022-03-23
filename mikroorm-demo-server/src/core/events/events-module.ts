import { DynamicModule, Module } from '@nestjs/common';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { EVENT_MONITOR_CONFIG_OPTIONS, EventMonitorService } from './event-monitor.service';
import { EventEmitterService } from './event-emitter.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterModuleOptions } from '@nestjs/event-emitter/dist/interfaces';

@Module({})
export class EventsModule {
  static forRoot(config: EventEmitterModuleOptions, monitorLoggerConfig?: WinstonModuleOptions): DynamicModule {
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
      imports: [EventEmitterModule.forRoot(config)],
      providers: [EventEmitterService, ...dynamicProviders],
      controllers: [],
      exports: [EventEmitterService],
    };
  }
}
