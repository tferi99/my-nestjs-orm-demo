import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { OnEvent } from '@nestjs/event-emitter';
import { AppEvent } from './events.model';

export const EVENT_MONITOR_CONFIG_OPTIONS = 'EVENT_MONITOR_CONFIG_OPTIONS';

/**
 * Provide configuration as EVENT_MONITOR_CONFIG_OPTIONS (WinstonModuleOptions).
 * For example specifying LoggingConfig.EVENTS as configuration:
 *
 *  providers: [
 *    {
 *      provide: EVENT_MONITOR_CONFIG_OPTIONS,
 *      useValue: LoggingConfig.EVENTS,
 *    },
 *    EventMonitorService,
 *  ]
 */
@Injectable()
export class EventMonitorService {
  private readonly logger = new Logger(EventMonitorService.name);

  private monitorLogger: LoggerService;

  constructor(@Inject(EVENT_MONITOR_CONFIG_OPTIONS) private options) {
    this.monitorLogger = WinstonModule.createLogger(options);
    this.logger.log('Event Monitor Logger initialized');
  }

  @OnEvent('**')
  handleAllEvents(event: AppEvent) {
    this.monitorLogger.debug(JSON.stringify(event));
  }
}
