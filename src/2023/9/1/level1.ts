import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const i = input.readLines().map((line) => line.match(/-?\d+/g)!.map(Number));

  let ans = 0;
  for (const line of i) {
    const sublines: number[][] = [line];
    while (!sublines.at(-1)!.every((e) => e === 0)) {
      const subline = [];
      for (let i = 1; i < sublines.at(-1)!.length; i++) {
        const a = sublines.at(-1)![i];
        const b = sublines.at(-1)![i - 1];
        subline.push(a - b);
      }
      sublines.push(subline);
    }
    for (const sl of sublines) {
      ans += sl.at(-1)!;
    }
  }

  return ans;
}
