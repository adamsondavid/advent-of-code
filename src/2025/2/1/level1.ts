import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const ranges = input
    .readLine()!
    .split(",")
    .map((range) => {
      const [from, to] = range.split("-").map(Number);
      return { from, to };
    });

  let res = 0;

  for (const range of ranges) {
    for (let i = range.from; i <= range.to; i++) {
      const str = i.toString();
      const a = str.substring(0, str.length / 2);
      const b = str.substring(str.length / 2, str.length);
      if (a === b) res += i;
    }
  }

  return res;
}
