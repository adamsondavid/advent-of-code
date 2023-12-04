import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));
  return [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]
    .map((move) => {
      const pos = { x: 0, y: 0 };
      let trees = 0;
      while (pos.y !== map.length - 1) {
        pos.x += move.x;
        pos.y += move.y;
        if (map[pos.y][pos.x % map[pos.y].length] === "#") trees++;
      }
      return trees;
    })
    .reduce((product, trees) => product * trees, 1);
}
