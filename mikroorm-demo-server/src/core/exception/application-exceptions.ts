import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor() {
    super('AlreadyExists', HttpStatus.CONFLICT);
  }
}

export class UserDisabledException extends HttpException {
  constructor(username: string) {
    super(username + ' - UserDisabled', HttpStatus.UNAUTHORIZED);
  }
}

export class AccountTestFailedException extends HttpException {
  constructor(username: string) {
    super(username + ' - account test failed', HttpStatus.UNAUTHORIZED);
  }
}
