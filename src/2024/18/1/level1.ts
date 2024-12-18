import StringStream from "../../../utils/string-stream";

const dirs = [
  { y: -1, x: 0 }, // Top
  { y: 0, x: 1 }, // Right
  { y: 1, x: 0 }, // Bottom
  { y: 0, x: -1 }, // Left
] as const;

export function solve(input: StringStream, numBytes: number, size: number) {
  const bytes = input
    .readLines()
    .slice(0, numBytes)
    .map((line) => line.split(",").map(Number));

  const map: string[][] = new Array(size + 1).fill(0).map(() => new Array(size + 1).fill("."));
  for (const [x, y] of bytes) map[y][x] = "#";

  const queue = [{ pos: { x: 0, y: 0 }, dist: 0 }];
  const visited = new Set<string>();
  while (queue.length) {
    const current = queue.shift()!;

    if (current.pos.x === map.length - 1 && current.pos.y === map.length - 1) return current.dist;

    if (visited.has(JSON.stringify(current.pos))) continue;
    visited.add(JSON.stringify(current.pos));

    for (const dir of dirs) {
      const candidate = { pos: { x: current.pos.x + dir.x, y: current.pos.y + dir.y }, dist: current.dist + 1 };
      const target = map[candidate.pos.y]?.[candidate.pos.x];
      if (target && target !== "#") queue.push(candidate);
    }
  }
}
