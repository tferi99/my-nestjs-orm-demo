import { Logger } from '@nestjs/common';
import { BoolUtils } from './bool-utils';

export class LoggerUtils {
  static debugIfEnv(logger: Logger, envBoolVar: string, msg: string, data?: any) {
    if (BoolUtils.toBoolean(process.env[envBoolVar])) {
      if (!data) {
        logger.debug(msg);
      } else {
        logger.debug(msg + ' - ' + JSON.stringify(data));
      }
    }
  }
}
