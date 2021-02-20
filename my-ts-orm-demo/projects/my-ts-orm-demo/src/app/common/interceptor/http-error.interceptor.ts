import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {HttpErrorDto} from './http-error-dto.model';

/**
 * Error handling:
 *    - on client errors we just set an error message -> toaster
 *    - on server errors:
 *      - 401:
 *          - /reload   -> dispatch LogoutAction
 *          - /loginstatus -> do nothing
 *      - 403:
 *          - /auth/init-csrf -> problem page
 *      - 404: -> error message to toaster
 *
 */

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(0),                                                 // retry on error
      // tap(evt => this.log.trace('>>>>>> HTTP EVENT:', evt)), // this does not add much, you can track the same on the network tab
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    // console.log('error caught by interceptor:', error );
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {                    // client-side error
      errorMessage = `Client Error: ${err.error.message}`;
    } else {
      // server-side error
      errorMessage = `Server Error[${err.status}]: ${err.error.message}`;
      // this.log.debug('######### HTTP ERR:', err);
/*      switch (err.status) {
        case 401:
          errorMessageId = 'network.msgAuthError';
          if (err.url.endsWith('/reload')) {
            errorMessageId = undefined;
            this.store.dispatch(new LogoutAction());
          } else if (err.url.endsWith('/loginstatus')) {
            errorMessageId = undefined;
          }
          break;
        case 403:
          // ignore the 403 error code for CSRF initialization
          if (!err.url.endsWith('/auth/init-csrf')) {
              const msgId = this.getErrorMessageId(err);
              if (msgId === 'login.msgBadLoggedInUserError') {
                const msg = this.getErrorMessageForResponse(err);
                this.problemService.gotoProblemPage(msg);
              }
              errorMessage = this.getErrorMessageForResponse(err, 'Authentication error').message;
          }
          break;
        case 404:
          if (err.url.endsWith('/login') || err.url.endsWith('/reload')) {
            errorMessage = this.getErrorMessageForResponse(err).message;
          } else {
            errorMessage = 'Not found anything';
          }
          break;
        case 504:
          errorMessageId = 'network.msgServerInaccessible';
          break;
        default:
          errorMessageId = 'network.msgUnknownError';
          errorMessageExt = `Network Error - code: ${err.status}\nMessage: ${err.message}`;
      }*/
    }

    if (errorMessage) {
      this.toastr.error(errorMessage);
    }
    return throwError(errorMessage);
  }

  /**
   * It assumes error response as HttpErrorDto and it tries to get error problemInfo ID from response.
   * @param err error response
   */
  private getErrorMessageId(err: HttpErrorResponse): string {
    if (!err || !err.error) {
      return null;
    }
    const errResponse = err.error as HttpErrorDto;
    if (errResponse.errorMessageId) {
      return errResponse.errorMessageId;
    }
    return null;
  }
}
