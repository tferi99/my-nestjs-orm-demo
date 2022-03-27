import { ForbiddenException, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Auth, Role } from '@app/client-lib';

export abstract class ControllerBase {
  @Inject(REQUEST)
  private request;

  ControllerBase() {}

  checkCallEnabledCondition(condition: boolean): void {
    if (!condition) {
      throw new ForbiddenException();
    }
  }

  dumpCurrentUser() {
    console.log('# Current user:', this.getCurrentUser());
  }

  getCurrentUser(): Auth {
    return this.request.user;
  }

  getCurrentUserId(): number {
    const auth = this.getCurrentUser();
    if (auth == undefined) {
      return -10000;
    }
    return Number(auth.id);
  }

  isCurrentUserAdmin(): boolean {
    const auth = this.getCurrentUser();
    if (auth == undefined) {
      return false;
    }
    return auth.roles.includes(Role.Admin);
  }
}
