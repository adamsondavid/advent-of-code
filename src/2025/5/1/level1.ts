import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const [_ranges, _ingredients] = input
    .readLines()
    .join("\n")
    .split("\n\n")
    .map((e) => e.split("\n"));

  const ranges = _ranges.map((range) => {
    const [from, to] = range.split("-").map(Number);
    return { from, to };
  });

  const ingredients = _ingredients.map(Number);

  let res = 0;

  for (const ingredient of ingredients) {
    for (const range of ranges) {
      if (ingredient >= range.from && ingredient <= range.to) {
        res++;
        break;
      }
    }
  }

  return res;
}
