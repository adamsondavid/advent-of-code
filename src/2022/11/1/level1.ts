import Level from "../../../utils/level";

interface Monkey {
  items: number[];
  operation: string;
  test: number;
  test_t: number;
  test_f: number;
}

export default class extends Level {
  public run() {
    const monkeys: Monkey[] = [];
    const inspections = new Map<number, number>();

    let line;
    while ((line = this.input.readLine()) !== undefined) {
      if (line === "") continue;
      const items = this.input
        .readLine()!
        .replace("  Starting items: ", "")
        .split(",")
        .map((s) => parseInt(s));
      const operation = this.input.readLine()!.replace("  Operation: new = old ", "");
      const test = parseInt(this.input.readLine()!.replace("  Test: divisible by ", ""));
      const test_t = parseInt(this.input.readLine()!.replace("    If true: throw to monkey ", ""));
      const test_f = parseInt(this.input.readLine()!.replace("    If false: throw to monkey ", ""));
      monkeys.push({ items, operation, test, test_t, test_f });
    }

    for (let i = 0; i < 20; i++) {
      for (const [idx, monkey] of monkeys.entries()) {
        while (monkey.items.length) {
          let item = monkey.items.shift()!;
          const [op, arg_s] = monkey.operation.split(" ");
          const arg = arg_s === "old" ? item : parseInt(arg_s);
          if (op === "+") item += arg;
          if (op === "*") item *= arg;
          item = Math.floor(item / 3);
          const otherMonkey = item % monkey.test === 0 ? monkey.test_t : monkey.test_f;
          monkeys[otherMonkey].items.push(item);
          inspections.set(idx, (inspections.get(idx) ?? 0) + 1);
        }
      }
    }

    return Array.from(inspections.values())
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((a, b) => a * b, 1);
  }
}
