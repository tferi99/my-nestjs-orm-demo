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
