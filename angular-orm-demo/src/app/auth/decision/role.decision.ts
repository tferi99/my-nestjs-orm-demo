import {Decision, DecisionContext, Op} from "./decision-types";
import {Role} from "@app/easy-trader-lib";

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
