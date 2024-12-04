import StringStream from "../../../utils/string-stream";

export function solve(_input: StringStream) {
  const input = _input.readLines().map((line) => line.split(""));

  let result = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === "X") {
        // horizontal
        if (input[y][x + 1] === "M" && input[y][x + 2] === "A" && input[y][x + 3] === "S") result++;
        // horizontal reversed
        if (input[y][x - 1] === "M" && input[y][x - 2] === "A" && input[y][x - 3] === "S") result++;
        // vertical
        if (input[y + 1]?.[x] === "M" && input[y + 2]?.[x] === "A" && input[y + 3]?.[x] === "S") result++;
        // vertical reversed
        if (input[y - 1]?.[x] === "M" && input[y - 2]?.[x] === "A" && input[y - 3]?.[x] === "S") result++;
        // diagonal down right
        if (input[y + 1]?.[x + 1] === "M" && input[y + 2]?.[x + 2] === "A" && input[y + 3]?.[x + 3] === "S") result++;
        // diagonal down left
        if (input[y + 1]?.[x - 1] === "M" && input[y + 2]?.[x - 2] === "A" && input[y + 3]?.[x - 3] === "S") result++;
        // diagonal up right
        if (input[y - 1]?.[x + 1] === "M" && input[y - 2]?.[x + 2] === "A" && input[y - 3]?.[x + 3] === "S") result++;
        // diagonal up left
        if (input[y - 1]?.[x - 1] === "M" && input[y - 2]?.[x - 2] === "A" && input[y - 3]?.[x - 3] === "S") result++;
      }
    }
  }
  return result;
}
