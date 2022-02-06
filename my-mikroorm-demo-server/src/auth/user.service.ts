import { Injectable } from '@nestjs/common';
import { User } from './model/auth.model';
import * as _ from 'lodash';

const USERS: User[] = [
  { id: 0, name: 'admin', password: 'admin', admin: true },
  { id: 1, name: 'user', password: 'user', admin: false },
];

@Injectable()
export class UserService {
  getUserByName(name: string) {
    return _.find(USERS, { name: name });
  }
}
