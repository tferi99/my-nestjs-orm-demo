export class AppError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ServerAppError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UniqueConstraintError extends ServerAppError {
  cause: any;
  constructor(message: string, cause: any) {
    super(message);
    this.cause = cause;
  }
}

export class ForeignKeyConstraintViolationError extends ServerAppError {
  cause: any;
  constructor(message: string, cause: any) {
    super(message);
    this.cause = cause;
  }
}

export class UserDisabledError extends ServerAppError {
  cause: any;
  constructor(message: string, cause: any) {
    super(message);
    this.cause = cause;
  }
}

export class AccountTestFailedError extends ServerAppError {
  cause: any;
  constructor(message: string, cause: any) {
    super(message);
    this.cause = cause;
  }
}

export class UnknownServerError extends ServerAppError {
  cause: any;
  constructor(message: string, cause: any) {
    super('UNKNOWN SERVER ERROR: ' + message);
    this.cause = cause;
  }
}
