import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  let dial = 50;
  let res = 0;

  for (const line of input.readLines()) {
    const [_, op, value] = line.match(/([RL])(\d+)/)!;
    const v = Number(value);

    for (let i = 0; i < v; i++) {
      if (op === "R") dial++;
      else if (op === "L") dial--;
      dial = (dial + 100) % 100;
      if (dial === 0) res++;
    }
  }

  return res;
}
