import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/auth.model';

@Injectable()
export class AuthService {
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
    console.log(`--> AuthService.validateUser [${username}|${pwd}] agains `, user);

    if (user) {
      //if (await SecurityUtils.validateString(pass, user.password)) {        // if encrypted
      if (user.password === pwd) {
        const { password, ...result } = user; // remove password
        console.log('---> OK');
        return result;
      } else {
        console.error('Bad password');
      }
    }
    console.log('---> Err !!!');
    return null;
  }
}
