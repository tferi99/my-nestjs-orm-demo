import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';

import {AppState} from '../../app.state';
import {ErrorMessageUtils} from './error-message-utils';
import {CustomHttpStatus, ResponseErrorPayload, ServerError} from '@app/client-lib';
import {ServerAppError, UniqueConstraintError} from './app-error';


/**
 * Error handling:
 *    - on client errors we just set an error message -> toaster
 *    - on server errors:
 *
 */

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private logger: NGXLogger,
    private store: Store<AppState>,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(0),                                                 // retry on error
      // tap(evt => this.log.trace('>>>>>> HTTP EVENT:', evt)), // this does not add much, you can track the same on the network tab
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    console.log('>>>>>>> Error caught by interceptor:', err);
    let errorMessage = '';
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
          }
/*          if (err.url?.endsWith('/testAdmin') || err.url?.endsWith('/testUser')) {
              notify = false;
          }*/
          break;
        case HttpStatusCode.Forbidden:
          if (err.url?.includes('/testAdmin') || err.url?.includes('/testUser')) {
            notify = false;
          }
          break;
        case HttpStatusCode.NotFound:
          break;
        case HttpStatusCode.GatewayTimeout:
          break;
        case CustomHttpStatus.ApplicationError:
          const ex = this.identifyServerApplicationErrors(err.error as ResponseErrorPayload);
          if (ex !== undefined) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!! IDENTIFIED');
            return throwError(ex);
          }
          break;
        default:
          errorMessage = 'Unknown Error';
          errorMessageExt = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
    }

    if (notify) {
      errorMessage = ErrorMessageUtils.getErrorMessage('SERVER ERROR:\n', err);
      if (errorMessageExt) {
        errorMessage += ' : ' + errorMessageExt;
      }
      this.toastr.error('[INTERCEPTOR] - ' + errorMessage);
      console.log(errorMessage);
    }
    return throwError(err);
  }

  identifyServerApplicationErrors(error: ResponseErrorPayload): ServerAppError | undefined {
    console.log('### identifyServerApplicationErrors: ', error);
    let ex;
    if (error.errorCode) {
      switch (error.errorCode) {
        case ServerError.DdUniqueConstraintError:
          ex = new UniqueConstraintError(error.message, error);
          break;
      }
    }
    console.log('### identified?: ', ex);
    return ex;
  }
}

