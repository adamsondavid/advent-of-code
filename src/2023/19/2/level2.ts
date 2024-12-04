import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const rulesString = input.readLines().join("\n").split("\n\n")[0];

  const rules = Object.fromEntries(
    rulesString.split("\n").map((line) => {
      const [, name, expr] = line.match(/([a-zA-Z]+)\{(.*)}/)!;
      const conditions = expr.split(",");
      const fallbackResult = conditions.pop()!;
      const rules = conditions
        .map((condition) => condition.match(/([xmas])([<>])(\d+):([a-zA-Z]+)/)!)
        .map(([, variable, operator, breakpoint, result]) => ({
          variable: variable as "x" | "m" | "a" | "s",
          operator,
          breakpoint: parseInt(breakpoint),
          result,
        }));
      return [name, { rules, fallbackResult }];
    }),
  );

  const ranges = [
    { rule: "in", xStart: 1, xEnd: 4000, mStart: 1, mEnd: 4000, aStart: 1, aEnd: 4000, sStart: 1, sEnd: 4000 },
  ];
  const accepted: typeof ranges = [];

  while (ranges.length) {
    let current = ranges.pop()!;
    if (current.rule === "R") continue;
    if (current.rule === "A") {
      accepted.push(current);
      continue;
    }
    const rule = rules[current.rule];
    for (const r of rule.rules) {
      const startKey = `${r.variable}Start` as const;
      const endKey = `${r.variable}End` as const;
      if (r.operator === ">") {
        ranges.push({ ...current, [startKey]: Math.max(current[startKey], r.breakpoint + 1), rule: r.result });
        current[endKey] = Math.min(current[endKey], r.breakpoint);
      } else if (r.operator === "<") {
        ranges.push({ ...current, [endKey]: Math.min(current[endKey], r.breakpoint - 1), rule: r.result });
        current[startKey] = Math.max(current[startKey], r.breakpoint);
      }
    }
    ranges.push({ ...current, rule: rule.fallbackResult });
  }

  return accepted
    .map((range) =>
      (["x", "m", "a", "s"] as const)
        .map((id) => Math.abs(range[`${id}End`] - range[`${id}Start`] + 1))
        .reduce((a, b) => a * b),
    )
    .reduce((a, b) => a + b);
}
