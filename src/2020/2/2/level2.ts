import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  return input
    .readLines()
    .map((line) => {
      const [idxA, idxB] = line.split(" ")[0].split("-");
      const char = line.split(" ")[1].split(":")[0];
      const pw = line.split(" ")[2];
      return (pw[parseInt(idxA) - 1] === char ? 1 : 0) + (pw[parseInt(idxB) - 1] === char ? 1 : 0) === 1;
    })
    .filter((valid) => valid).length;
}
