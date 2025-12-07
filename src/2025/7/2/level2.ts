import StringStream from "../../../utils/string-stream";
import { cache } from "../../../utils/cache";

type Vec2 = {
  x: number;
  y: number;
};

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  const start: Vec2 = { x: 0, y: 0 };
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") {
        start.x = x;
        start.y = y;
      }
    }
  }

  const move = cache((pos: Vec2): number => {
    pos.y++;
    if (map[pos.y][pos.x] === "^") {
      return move({ x: pos.x - 1, y: pos.y }) + move({ x: pos.x + 1, y: pos.y });
    } else if (pos.y !== map.length - 1) {
      return move(pos);
    } else return 1;
  });

  return move(start);
}
