import {LogicalEvaluator} from "./LogicalEvaluator";
import {Decision, DecisionContext, Op} from "./decision-types";

export class DecisionsEvaluator extends LogicalEvaluator<Decision> {

  constructor(ctx: DecisionContext, op: Op, items: Decision[]) {
    super(ctx, op, items);
  }

  protected eval(item: Decision, ctx: DecisionContext): boolean {
    return item.evaluate(ctx);
  }

}
