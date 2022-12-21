import Level from "../../../utils/level";

export default class extends Level {
  private readonly monkeys = new Map<string, string>();

  public run() {
    for (const line of this.input.readLines()) {
      const [name, expression] = line.split(": ");
      this.monkeys.set(name, expression);
    }

    return this.eval("root");
  }

  private eval(name: string): number {
    const expression = this.monkeys.get(name);
    if (!expression) throw new Error("unknown monkey: " + name);

    const [a, operation, b] = expression.split(" ");

    if (!operation) return parseInt(a);

    let aEvaluated = parseInt(a);
    let bEvaluated = parseInt(b);

    if (isNaN(aEvaluated)) aEvaluated = this.eval(a);
    if (isNaN(bEvaluated)) bEvaluated = this.eval(b);

    if (operation === "+") return aEvaluated + bEvaluated;
    if (operation === "-") return aEvaluated - bEvaluated;
    if (operation === "*") return aEvaluated * bEvaluated;
    if (operation === "/") return aEvaluated / bEvaluated;

    throw new Error("unknown operation: " + operation);
  }
}
