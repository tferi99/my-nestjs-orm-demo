import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';
import * as winston from 'winston';
import { LogginFormats } from './logging-formats';
import * as moment from 'moment';

export const LOG_DIR = 'logs';

// logging format
//export const LOG_FORMAT_CONSOLE = nestWinstonModuleUtilities.format.nestLike();

//console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! logging.config.ts !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - winston.format: ' + winston.format);

const mainLoggerConfig: WinstonModuleOptions = {
  handleExceptions: true,
  // logging for unhandled exceptions
  exceptionHandlers: [
    new winston.transports.File({
      filename: LOG_DIR + '/unhandled-exceptions.log',
      level: 'error',
      format: winston.format.combine(winston.format.uncolorize({ message: true }), LogginFormats.FILE),
    }),
  ],
  transports: [
    // logging all here
    new winston.transports.File({
      filename: LOG_DIR + '/app.log',
      level: 'debug',
      format: winston.format.combine(winston.format.uncolorize({ message: true }), LogginFormats.CONSOLE), // format is factory
    }),
    // logging only errors here
    new winston.transports.File({
      filename: LOG_DIR + '/errors.log',
      level: 'error',
      //      format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), winston.format.ms(), LogginFormats.FILE),
      format: winston.format.combine(winston.format.uncolorize({ message: true }), LogginFormats.FILE),
      //format: winston.format.combine(winston.format.uncolorize({ message: true }), LogginFormats.FILE),
    }),
    new winston.transports.Console({
      level: 'debug',
      silent: process.env.NODE_ENV === 'production',
      //format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), winston.format.colorize(), winston.format.ms(), LOG_FORMAT_CONSOLE),
      //format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: false })),
      format: winston.format.combine(winston.format.colorize({ all: true }), LogginFormats.CONSOLE), // factory
    }),
  ],
};

const eventsLoggerConfig: WinstonModuleOptions = {
  handleExceptions: false,
  transports: [
    new winston.transports.File({
      filename: LOG_DIR + '/events.log',
      level: 'debug',
      format: winston.format.combine(winston.format.uncolorize({ message: true }), LogginFormats.FILE),
    }),
  ],
};

export const LoggingConfig = {
  MAIN: mainLoggerConfig,
  EVENTS: eventsLoggerConfig,
};
