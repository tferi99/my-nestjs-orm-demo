import * as winston from 'winston';
import safeStringify from 'fast-safe-stringify';
import * as moment from 'moment';

//console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! logging-formats.ts !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - winston.format: ' + winston.format);

/**
 * Factory to create console logging format.
 *
 * @param appName
 * @constructor
 */
const ConsoleLoggingFormat = winston.format.printf(({ context, level, timestamp, message, ms, ...meta }) => {
  //if ('undefined' !== typeof timestamp) {
  timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  //}

  return (
    ('undefined' !== typeof timestamp ? `${timestamp}` : '') +
    '|' +
    level.charAt(0).toUpperCase() +
    level.slice(1) +
    '|' +
    ('undefined' !== typeof context ? `${context}` : '') +
    '|' +
    message +
    '|' +
    safeStringify(meta)
  );
});

/**
 * Factory to create file logging format.
 *
 * @param appName
 * @constructor
 */
export const FileLoggingFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  timestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
  return `${timestamp}|${level}|${message}`;
});

export const LogginFormats = {
  CONSOLE: ConsoleLoggingFormat,
  FILE: FileLoggingFormat,
};
