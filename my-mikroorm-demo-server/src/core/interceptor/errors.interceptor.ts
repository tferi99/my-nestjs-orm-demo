import { Observable, throwError } from 'rxjs';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { ServerException } from '../exception/server-exception';
import { ServerError } from '@app/easy-trader-lib';

/**
 * Not used now - filter used instead: {@link GlobalExceptionFilter}
 */
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err.response && err.response instanceof UniqueConstraintViolationException) {
          console.log('---> UniqueConstraintViolationException');
          return throwError(new ServerException(err.message, HttpStatus.CONFLICT, ServerError.DdUniqueConstraintError));
        }
        return throwError(err);
      }),
    );
  }
}
