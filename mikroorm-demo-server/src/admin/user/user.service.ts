import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { User } from '../admin.model';
import { LoggerUtils } from '../../core/util/logger.utils';

const USERS: User[] = [
  { id: 0, name: 'admin', password: 'admin', admin: true },
  { id: 1, name: 'user', password: 'user', admin: false },
];

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.getUserByName(username);
    if (user) {
      //if (await SecurityUtils.validateString(pass, user.password)) {        // if encrypted
      if (user.password === password) {
        const { password, ...result } = user; // remove password
        LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '---> OK');
        return result;
      } else {
        LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '---> Bad password');
      }
    }
    return null;
  }

  private getUserByName(name: string): User {
    this.logger.debug(`getUserByName(${name})`);
    return _.find(USERS, { name: name });
  }

}
