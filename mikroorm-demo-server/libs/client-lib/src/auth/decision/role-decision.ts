import {Decision, DecisionContext, Op} from "./decision.model";
import { Role } from '@app/client-lib';

export class RoleDecision implements Decision {
  role: Role;

  constructor(role: Role) {
    this.role = role;
  }

  evaluate(ctx: DecisionContext): boolean {
    if (!ctx.currentUser) {
      return false;
    }
    return ctx.currentUser.roles.includes(this.role);
  }
}
