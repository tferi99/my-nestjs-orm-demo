import { DecisionContext, Op } from "./decision-types";

export abstract class LogicalEvaluator<D> {
  ctx: DecisionContext;
  op: Op;
  items: D[];

  constructor(ctx: DecisionContext, op: Op, items: D[])
  {
    this.ctx = ctx;
    this.op = op;
    this.items = items;
  }

  evaluate(): boolean {
    let ret = this.op === Op.AND;       // AND:true, OR:false
    for (let item of this.items) {
      const result: boolean = this.eval(item, this.ctx);
      // AND
      if (this.op === Op.AND) {
        ret = ret && result;
        if (!ret) {
          break;
        }
      }
      // OR
      else if (this.op === Op.OR) {
        ret = ret || result;
        if (ret) {
          break;
        }
      }
    }
    return ret;
  }

  protected abstract eval(item: D, ctx: DecisionContext): boolean;
}
