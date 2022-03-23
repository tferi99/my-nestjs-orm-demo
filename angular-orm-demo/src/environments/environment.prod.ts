import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: true,

  logLevel: NgxLoggerLevel.DEBUG,
  serverLogLevel: NgxLoggerLevel.OFF,

  defaultUsername: '',
  defaultPassword: '',
};
