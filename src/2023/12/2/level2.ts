import StringStream from "../../../utils/string-stream";
import { cache } from "../../../utils/cache";

const possibilities = cache((condition: string, checks: number[]): number => {
  if (!condition.length) {
    if (!checks.length) return 1;
    return 0;
  }
  if (!checks.length) {
    for (let i = 0; i < condition.length; i++) if (condition[i] === "#") return 0;
    return 1;
  }
  if (checks.length + condition.length - 1 < checks.reduce((a, b) => a + b)) return 0;
  if (condition[0] === ".") return possibilities(condition.slice(1), checks);
  if (condition[0] === "#") {
    const [check, ...otherChecks] = checks;
    for (let i = 0; i < check; i++) if (condition[i] === ".") return 0;
    if (condition[check] === "#") return 0;
    return possibilities(condition.substring(check + 1), otherChecks);
  }
  return possibilities("#" + condition.substring(1), checks) + possibilities("." + condition.substring(1), checks);
});

export function solve(input: StringStream) {
  return input
    .readLines()
    .map((line) => line.split(" "))
    .map(([condition, checks]) => ({
      condition: new Array(5).fill(condition).join("?"),
      checks: new Array(5).fill(checks.match(/\d+/g)!.map(Number)).flat(),
    }))
    .map(({ condition, checks }) => possibilities(condition, checks))
    .reduce((sum, possibilities) => sum + possibilities);
}
