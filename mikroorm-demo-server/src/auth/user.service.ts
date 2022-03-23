import { Injectable, Logger } from '@nestjs/common';
import { User } from './model/auth.model';
import * as _ from 'lodash';

const USERS: User[] = [
  { id: 0, name: 'admin', password: 'admin', admin: true },
  { id: 1, name: 'user', password: 'user', admin: false },
];

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  getUserByName(name: string) {
    this.logger.debug(`getUserByName(${name})`);
    return _.find(USERS, { name: name });
  }
}
