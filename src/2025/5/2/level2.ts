import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const [_ranges] = input
    .readLines()
    .join("\n")
    .split("\n\n")
    .map((e) => e.split("\n"));

  const ranges = _ranges.map((range) => {
    const [from, to] = range.split("-").map(Number);
    return { from, to };
  });

  for (const rangeA of ranges) {
    for (const rangeB of ranges) {
      if (rangeA === rangeB) continue;
      if (rangeA.from >= rangeB.from && rangeA.from <= rangeB.to) {
        rangeA.from = rangeB.to + 1;
      }
      if (rangeA.to >= rangeB.from && rangeA.to <= rangeB.to) {
        rangeA.to = rangeB.from - 1;
      }
    }
  }

  let res = 0;
  for (const range of ranges) {
    const diff = range.to - range.from;
    if (diff >= 0) res += diff + 1;
  }
  return res;
}
