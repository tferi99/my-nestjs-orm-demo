import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor() {
    super('AlreadyExists', HttpStatus.CONFLICT);
  }
}
