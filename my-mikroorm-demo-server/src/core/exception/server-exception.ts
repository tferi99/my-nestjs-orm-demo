import { HttpException } from '@nestjs/common';
import { ServerError } from '@app/client-lib';

export class ServerException extends HttpException {
  constructor(response: string | Record<string, any>, status: number, appError: ServerError) {
    super(response, status);
  }
}
