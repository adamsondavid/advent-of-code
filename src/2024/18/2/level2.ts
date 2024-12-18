import StringStream from "../../../utils/string-stream";

const dirs = [
  { y: -1, x: 0 }, // Top
  { y: 0, x: 1 }, // Right
  { y: 1, x: 0 }, // Bottom
  { y: 0, x: -1 }, // Left
] as const;

function hasExit(map: string[][]) {
  const queue = [{ pos: { x: 0, y: 0 }, dist: 0 }];
  const visited = new Set<string>();
  while (queue.length) {
    const current = queue.pop()!;

    if (current.pos.x === map.length - 1 && current.pos.y === map.length - 1) return true;

    if (visited.has(JSON.stringify(current.pos))) continue;
    visited.add(JSON.stringify(current.pos));

    for (const dir of dirs) {
      const candidate = { pos: { x: current.pos.x + dir.x, y: current.pos.y + dir.y }, dist: current.dist + 1 };
      const target = map[candidate.pos.y]?.[candidate.pos.x];
      if (target && target !== "#") queue.push(candidate);
    }
  }
  return false;
}

export function solve(input: StringStream, size: number) {
  const bytes = input.readLines().map((line) => line.split(",").map(Number));

  // Could have used i=1024 since we already know that until 1024 there is no blockage.
  // Also, binary search would have made this a little faster.
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes.slice(0, i);
    const map: string[][] = new Array(size + 1).fill(0).map(() => new Array(size + 1).fill("."));
    for (const [x, y] of b) map[y][x] = "#";
    if (!hasExit(map)) return b.at(-1)!.join(",");
  }
  throw new Error("map has always exit");
}
