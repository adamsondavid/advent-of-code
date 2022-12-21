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

  private eval(name: string): string {
    if (name === "humn") return "x";
    const expression = this.monkeys.get(name);
    if (!expression) throw new Error("unknown monkey: " + name);

    const [a, operation, b] = expression.split(" ");

    if (!operation) return a;

    let aEvaluated;
    let bEvaluated;

    if (isNaN(parseInt(a))) aEvaluated = this.eval(a);
    if (isNaN(parseInt(b))) bEvaluated = this.eval(b);

    if (name === "root") return `${aEvaluated} = ${bEvaluated}`;
    if (operation === "+") return `(${aEvaluated} + ${bEvaluated})`;
    if (operation === "-") return `(${aEvaluated} - ${bEvaluated})`;
    if (operation === "*") return `(${aEvaluated} * ${bEvaluated})`;
    if (operation === "/") return `(${aEvaluated} / ${bEvaluated})`;

    throw new Error("unknown operation: " + operation);
  }
}
