export enum CustomHttpStatus {
  ApplicationError = 520,
  TestError = 521,
}

export enum ServerError {
  Unknown = 'UNKNOWN',
  DdUniqueConstraintError = 'DB_UNIQUE_CONSTRAINT_ERROR',
  DbForeignKeyConstraintViolationError = 'DB_FOREIGN_KEY_CONSTRAINT_VIOLATION_ERROR',
  UserDisabled = 'USER_DISABLED',
  AccountTestFailed = 'ACCOUNT_TEST_FAILED',
}

export interface ResponseErrorPayload {
  statusCode: number;
  errorCode: ServerError;
  timestamp: string;
  path: string;
  message: string;
}
