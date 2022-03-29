import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../admin/user/user.service';
import { LoggerUtils } from '../core/util/logger.utils';
import { User } from '../admin/admin.model';

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
  async validateUser(username: string, pwd: string): Promise<User> {
    LoggerUtils.debugIfEnv(this.logger, 'TRACE_AUTH', `--> AuthService.validateUser [${username}|${pwd}]`);
    return this.userService.validateUser(username, pwd);
  }
}
