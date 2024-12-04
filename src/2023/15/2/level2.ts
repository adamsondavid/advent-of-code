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
  const I = input
    .readLine()!
    .split(",")
    .map((val) => ({
      box: hash(val.split(/[-=]/g)![0]),
      operation: val.match(/[-=]/g)![0] as "-" | "=",
      label: val.split(/[-=]/g)![0],
      focalLength: parseInt(val.split(/[-=]/g)![1]),
    }));

  const boxes = new Map<number, { label: string; focalLength: number }[]>();
  for (const i of I) {
    const lenses = boxes.set(i.box, boxes.get(i.box) ?? []).get(i.box)!;
    const lens = lenses.find((lens) => lens.label === i.label);
    if (i.operation === "=" && lens) lens.focalLength = i.focalLength;
    if (i.operation === "=" && !lens) lenses.push({ label: i.label, focalLength: i.focalLength });
    if (i.operation === "-" && lens) lenses.splice(lenses.indexOf(lens), 1);
  }

  return [...boxes.entries()]
    .flatMap(([box, lenses]) => lenses.map((lens, i) => (box + 1) * (i + 1) * lens.focalLength))
    .reduce((sum, lensValue) => sum + lensValue);
}
