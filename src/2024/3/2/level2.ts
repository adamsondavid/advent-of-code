import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const instructions = input
    .readLines()
    .map((line) => line.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)!)
    .flat();

  let result = 0;
  let pause = false;
  for (const i of instructions) {
    if (i === "do()") pause = false;
    if (i === "don't()") pause = true;
    if (pause || !i.startsWith("mul")) continue;

    result += i
      .match(/(\d+),(\d+)/g)![0]
      .split(",")
      .map(Number)
      .reduce((a, b) => a * b, 1);
  }
  return result;
}
