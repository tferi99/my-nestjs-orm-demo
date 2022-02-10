import { HttpStatus } from '@nestjs/common';

export enum ServerError {
  Unknown = 'UNKNOWN',
  DdUniqueConstraintError = 'DB_UNIQUE_CONSTRAINT_ERROR',
}

export type HttpStatusExt = HttpStatus | CustomHttpStatus;

export interface ResponseErrorPayload {
  statusCode: HttpStatusExt;
  errorCode: ServerError;
  timestamp: string;
  path: string;
  message: string;
}

export enum CustomHttpStatus {
  ApplicationError = 520,
  TestError = 521,
}
