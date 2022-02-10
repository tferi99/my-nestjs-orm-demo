import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { CustomHttpStatus, HttpStatusExt, ResponseErrorPayload, ServerError } from '@app/client-lib';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    //console.error('GLOBAL EXCEPTION FILTER:', exception);

    // logging
    if (exception instanceof Error) {
      this.logError(exception as Error);
    } else {
      this.logUnknownError(exception);
    }
    const status: HttpStatus = exception instanceof HttpException ? (exception as HttpException).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();
    const payload = this.createCustomResponseErrorPayload(exception, ctx, status);
    response.status(payload.statusCode).json(payload);
  }

  logError(err: Error) {
    let fromStack = err.stack;
    const maxLen = parseInt(process.env.MAX_ERROR_LOG_LEN, 10) || 0;
    if (maxLen) {
      fromStack = fromStack.split('\n').join('');
      if (fromStack && fromStack.length > maxLen) {
        fromStack = fromStack.substr(0, maxLen) + '...';
      }
    }
    this.logger.error(err.constructor.name + '|' + fromStack);
  }

  logUnknownError(exception: any) {
    this.logger.error('Unknown exception type: ' + exception.toString());
  }

  /**
   * Identifies application related errors.
   * Error codes are in:   AppError
   *
   * If an error identified status will be: 510
   *
   *  See more:
   *    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
   *    https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
   *
   * @param exception
   * @param ctx
   * @param status
   */
  createCustomResponseErrorPayload(exception: any, ctx: HttpArgumentsHost, status: HttpStatusExt): ResponseErrorPayload {
    const request = ctx.getRequest();
    let appErr: ServerError = ServerError.Unknown;
    if (exception.response && exception.response instanceof UniqueConstraintViolationException) {
      appErr = ServerError.DdUniqueConstraintError;
    }
    if (appErr != ServerError.Unknown) {
      status = CustomHttpStatus.ApplicationError;
    }
    return {
      statusCode: status,
      timestamp: new Date().toLocaleDateString(), //  toISOString(),
      path: request.url,
      message: exception.toString(),
      errorCode: appErr,
    };
  }
}
