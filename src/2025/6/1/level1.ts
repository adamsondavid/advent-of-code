import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const lines = input.readLines().map((line) => line.match(/\d+|\+|\*/g)!);
  const ops = lines.pop()!;
  const firstLine = lines.shift()!.map(Number);
  for (const line of lines) {
    const numbers = line.map(Number);
    for (let i = 0; i < numbers.length; i++) {
      if (ops[i] === "*") firstLine[i] *= numbers[i];
      if (ops[i] === "+") firstLine[i] += numbers[i];
    }
  }
  return firstLine.reduce((a, b) => a + b, 0);
}
