import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const nums = input.readLines().map((line) => parseInt(line));
  for (const a of nums) {
    for (const b of nums) {
      if (a + b === 2020) return a * b;
    }
  }
}
