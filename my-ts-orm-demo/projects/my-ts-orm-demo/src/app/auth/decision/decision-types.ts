import {Auth} from "@app/easy-trader-lib";
import {LogicalEvaluator} from "./LogicalEvaluator";
import {DecisionsEvaluator} from "./DecisionsEvaluator";

export interface DecisionContext {
  currentUser: Auth;
  args?: any[];
}

export interface Decision {
  evaluate(ctx: DecisionContext): boolean;
}

export enum Op {
  AND = 'AND',
  OR = 'OR',
}

export class Decisions implements Decision {
  op: Op;
  items: Decision[];

  constructor(op: Op, items: Decision[]) {
    this.op = op;
    this.items = items;
  }

  evaluate(ctx: DecisionContext): boolean {
    const evaluator = new DecisionsEvaluator(ctx, this.op, this.items);
    return evaluator.evaluate();
  }

  toString(): string {
    let s = 'Decisions-' + this.op + '[\n';
    this.items.forEach((item: Decision) => s += '      ' + item + '\n');
    s += '    ]\n';
    return s;
  }
}
