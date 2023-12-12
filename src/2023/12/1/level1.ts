import StringStream from "../../../utils/string-stream";

function isValid(condition: string, checks: number[]) {
  const broken: string[] = condition.match(/#+/g) ?? [];
  if (broken.length > checks.length) return false;
  for (const [i, b] of broken.entries()) {
    if (checks[i] < b.length) return false;
  }
  return true;
}

export function solve(input: StringStream) {
  const springs = input
    .readLines()
    .map((line) => line.split(" "))
    .map(([condition, checks]) => ({ condition, checks: checks.match(/\d+/g)!.map(Number) }));

  let ans = 0;
  for (const spring of springs) {
    const combinations = [""];
    while (combinations[0].length < spring.condition.length) {
      const current = combinations.shift()!;
      if (!isValid(current, spring.checks)) continue;
      const nextSymbol = spring.condition[current.length];
      if (nextSymbol === "?") {
        combinations.push(current + "#");
        combinations.push(current + ".");
      } else combinations.push(current + nextSymbol);
    }
    const valid = combinations.filter((combination) => {
      const broken: string[] = combination.match(/#+/g) ?? [];
      if (broken.length !== spring.checks.length) return false;
      for (const [i, check] of spring.checks.entries()) {
        if (broken[i].length !== check) return false;
      }
      return true;
    });
    ans += valid.length;
  }

  return ans;
}
