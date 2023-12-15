import StringStream from "../../../utils/string-stream";

function hash(input: string) {
  let res = 0;
  for (const char of input) {
    const ascii = char.codePointAt(0)!;
    res += ascii;
    res *= 17;
    res = res % 256;
  }
  return res;
}

export function solve(input: StringStream) {
  return input
    .readLine()!
    .split(",")
    .map((val) => hash(val))
    .reduce((sum, hash) => sum + hash);
}
