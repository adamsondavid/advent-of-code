import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  let res = 0;
  for (const bank of input.readLines()) {
    const batteries = bank.split("").map(Number);
    const first = Math.max(...batteries.slice(0, batteries.length - 1));
    const second = Math.max(...batteries.slice(batteries.indexOf(first) + 1));
    res += Number(`${first}${second}`);
  }
  return res;
}
