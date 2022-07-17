import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Store } from '@ngrx/store';

import { ErrorMessageUtils } from './error-message-utils';
import { CustomHttpStatus, ResponseErrorPayload, ServerError } from '@app/client-lib';
import {
  AccountTestFailedError,
  ForeignKeyConstraintViolationError,
  ServerAppError,
  UniqueConstraintError, UnknownServerError,
  UserDisabledError
} from './app-error';
import { AppState } from '../../store/app.reducer';
import { LogoutAction } from '../../auth/store/auth.actions';
import { ToastrService } from '../../prime-core/service/toastr.service';


/**
 * Error handling:
 *    - on client errors we just set an error message -> toaster
 *    - on server errors:
 *
 */

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  messenger: Subject<string> = new Subject<string>();

  constructor(
    private toastr: ToastrService,
    private logger: NGXLogger,
    private store: Store<AppState>,
  ) {
    this.messenger.subscribe(
      msg => this.toastr.error( msg)
    );
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(0),                                                 // retry on error
      // tap(evt => this.log.trace('>>>>>> HTTP EVENT:', evt)), // this does not add much, you can track the same on the network tab
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    console.log('>>>>>>> Error caught by interceptor:', err);
    let errorMessage;
    let errorMessageExt;
    let notify = true;
    if (err.error instanceof ErrorEvent) {                    // client-side error
      errorMessage = `CLIENT ERROR: ${err.error.message}`;
    } else {                                                    // server-side error
      // this.log.debug('######### HTTP ERR:', err);
      switch (err.status) {
        case HttpStatusCode.Unauthorized:
          if (err.url?.endsWith('/login')) {
            notify = false;
          } else {
            this.store.dispatch(LogoutAction());
          }
          break;
        case HttpStatusCode.Forbidden:
          if (err.url?.includes('/testAdmin') || err.url?.includes('/testUser')) {
            notify = false;
          }
          break;
        case HttpStatusCode.NotFound:
          break;
        case HttpStatusCode.GatewayTimeout:
          errorMessage = 'Server is inaccessible';
          break;
        case CustomHttpStatus.ApplicationError:
          const ex = this.identifyServerApplicationErrors(err.error as ResponseErrorPayload);
          if (ex !== undefined) {
            return throwError(ex);
          }
          errorMessage = 'Server Error';
          if (err.error) {
            errorMessageExt = `Error Code: ${err.status}\nMessage: ${err.error.message}`;
          }
          break;
        case HttpStatusCode.NotImplemented:
          if (err.error) {
            errorMessageExt = `Error Code: ${err.status}\nMessage: ${err.error.message}`;
          }
          break;
        default:
          errorMessage = 'Unknown Error';
          errorMessageExt = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
    }

    if (errorMessage || notify) {
      if (errorMessage) {
        this.toastr.error(errorMessage);
      } else {
        errorMessage = '[INTERCEPTOR] - ' + ErrorMessageUtils.getErrorMessage('SERVER ERROR:\n', err);
        if (errorMessageExt) {
          errorMessage += ' : ' + errorMessageExt;
        }
        this.toastr.error(errorMessage);
        console.log(errorMessage);
      }
    }
    return throwError(err);
  }

  identifyServerApplicationErrors(error: ResponseErrorPayload): ServerAppError | undefined {
    //console.log('### identifyServerApplicationErrors: ', error);
    let ex;
    if (error.errorCode) {
      switch (error.errorCode) {
        case ServerError.DdUniqueConstraintError:
          ex = new UniqueConstraintError(error.message, error);
          break;
        case ServerError.DbForeignKeyConstraintViolationError:
          ex = new ForeignKeyConstraintViolationError(error.message, error);
          break;
        case ServerError.UserDisabled:
          ex = new UserDisabledError(error.message, error);
          break;
        case ServerError.AccountTestFailed:
          ex = new AccountTestFailedError(error.message, error);
          break;
        default:
          ex = new UnknownServerError(error.message, error);
          break;
      }
    }
    console.log('### identified?: ', ex);
    return ex;
  }
}

