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
      for (let j = 1; j <= str.length / 2; j++) {
        const k = str.match(new RegExp(`.{1,${j}}`, "g"))!;
        if (k.every((el) => el === k[0])) {
          res += i;
          break;
        }
      }
    }
  }

  return res;
}
