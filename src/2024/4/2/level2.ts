import StringStream from "../../../utils/string-stream";

export function solve(_input: StringStream) {
  const input = _input.readLines().map((line) => line.split(""));

  let result = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (
        (input[y][x] === "M" && input[y + 1]?.[x + 1] === "A" && input[y + 2]?.[x + 2] === "S") ||
        (input[y][x] === "S" && input[y + 1]?.[x + 1] === "A" && input[y + 2]?.[x + 2] === "M")
      ) {
        if (input[y][x + 2] === "M" && input[y + 1]?.[x + 1] === "A" && input[y + 2]?.[x] === "S") result++;
        if (input[y][x + 2] === "S" && input[y + 1]?.[x + 1] === "A" && input[y + 2]?.[x] === "M") result++;
      }
    }
  }
  return result;
}
