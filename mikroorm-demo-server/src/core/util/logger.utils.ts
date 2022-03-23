import { Logger } from '@nestjs/common';
import { BoolUtils } from './bool-utils';

export class LoggerUtils {
  static debugIfEnv(logger: Logger, envBoolVar: string, msg: string) {
    if (BoolUtils.toBoolean(process.env[envBoolVar])) {
      logger.debug(msg);
    }
  }
}
