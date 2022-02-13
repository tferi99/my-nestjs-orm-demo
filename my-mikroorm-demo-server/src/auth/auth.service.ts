import { Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/auth.model';
import { LoggerUtils } from '../core/util/logger.utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
  ) {}

  /**
   * It returns promise of current user WITHOUT password.
   *
   * @param username
   * @param pass
   */
  async validateUser(username: string, pwd: string): Promise<any> {
    //const user = await this.userService.get({ filter: { name: username } });
    const user: User = this.userService.getUserByName(username);
    LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', `--> AuthService.validateUser [${username}|${pwd}]`);

    if (user) {
      //if (await SecurityUtils.validateString(pass, user.password)) {        // if encrypted
      if (user.password === pwd) {
        const { password, ...result } = user; // remove password
        LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '---> OK');
        return result;
      } else {
        LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '---> Bad password');
      }
    }
    LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', '---> Err !!!');
    return null;
  }
}
