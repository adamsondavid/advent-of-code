import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  let dial = 50;
  let res = 0;

  for (const line of input.readLines()) {
    const [_, op, value] = line.match(/([RL])(\d+)/)!;
    let v = Number(value);
    if (op === "L") v = -v;
    dial = (dial + v + 100) % 100;
    if (dial === 0) res++;
  }

  return res;
}
