import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  return input
    .readLines()
    .map((line) => {
      const [minString, maxString] = line.split(" ")[0].split("-");
      const min = parseInt(minString);
      const max = parseInt(maxString);
      const char = line.split(" ")[1].split(":")[0];
      const pw = line.split(" ")[2];
      const amount = pw.split("").filter((c) => c === char).length;
      return amount >= min && amount <= max;
    })
    .filter((valid) => valid).length;
}
