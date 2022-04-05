import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { LoggerUtils } from '../../core/util/logger.utils';
import { User } from './user.model';
import { Auth, Role } from '@app/client-lib';

const USERS: User[] = [
  { id: 0, name: 'admin', password: 'admin', admin: true },
  { id: 1, name: 'user', password: 'user', admin: false },
];

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  async validateUser(username: string, password: string): Promise<Auth> {
    const user: User = await this.getUserByName(username);
    if (user) {
      //if (await SecurityUtils.validateString(pass, user.password)) {        // if encrypted
      if (user.password === password) {
        const auth: Auth = {
          id: user.id,
          name: user.name,
          roles: [],
        };
        auth.roles.push(Role.User);
        if (user.admin) {
          auth.roles.push(Role.Admin);
        }
        LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '---> OK');
        return auth;
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
