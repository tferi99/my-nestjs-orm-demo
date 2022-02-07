import {HttpErrorResponse} from "@angular/common/http";

export class ErrorMessageUtils {
  static getErrorMessage(prefix: string, err: any) {
    let msg = '';
    if (prefix) {
      msg += prefix + ' ';
    }
    if (err.message) {
      msg += err.message;
    } else {
      msg += '?';
    }
/*    if (err.url) {
      msg += ` - (URL: ${err.url})`;
    }*/
    return msg;
  }
}
