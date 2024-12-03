import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const instructions = input
    .readLines()
    .map((line) => line.match(/mul\(\d+,\d+\)/g)!)
    .flat();

  let result = 0;
  for (const i of instructions) {
    const mul = (a: number, b: number) => a * b;
    result += eval(i);
  }
  return result;
}
