import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));
  let pos = { x: 0, y: 0 };
  let trees = 0;
  while (pos.y !== map.length - 1) {
    pos = { x: pos.x + 3, y: pos.y + 1 };
    if (map[pos.y][pos.x % map[pos.y].length] === "#") trees++;
  }
  return trees;
}
