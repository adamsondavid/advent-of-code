import StringStream from "../../../utils/string-stream";
import Heap from "heap-js";

const dirs = [
  { y: -1, x: 0 }, // Top
  { y: 0, x: 1 }, // Right
  { y: 1, x: 0 }, // Bottom
  { y: 0, x: -1 }, // Left
] as const;

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split("").map(Number));

  const closed = new Set<string>();
  const open = new Heap<{ x: number; y: number; cost: number; dir: number; stepsSinceLastTurn: number }>(
    (a, b) => a.cost - b.cost,
  );
  open.init([{ x: 0, y: 0, cost: 0, dir: -1, stepsSinceLastTurn: -1 }]);
  while (open.length) {
    const current = open.pop()!;
    const _current = `${current.x} ${current.y} ${current.dir} ${current.stepsSinceLastTurn}`;
    if (closed.has(_current)) continue;
    closed.add(_current);

    for (let i = 0; i < dirs.length; i++) {
      const newDirLength = i === current.dir ? current.stepsSinceLastTurn + 1 : 1;
      const lengthCorrect =
        newDirLength <= 10 && (current.stepsSinceLastTurn == -1 || current.stepsSinceLastTurn >= 4 || i == current.dir);
      const isBackwards = [2, 3, 0, 1][current.dir] === i;

      const x = current.x + dirs[i].x;
      const y = current.y + dirs[i].y;
      if (map[y]?.[x] && !isBackwards && lengthCorrect) {
        const cost = current.cost + map[y][x];
        open.push({ x, y, cost, dir: i, stepsSinceLastTurn: newDirLength });
        if (x == map[0].length - 1 && y == map.length - 1) return cost;
      }
    }
  }
}
