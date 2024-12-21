import StringStream from "../../../utils/string-stream";

type Vec2 = { x: number; y: number };

function find(map: string[][], symbol: string) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === symbol) {
        map[y][x] = ".";
        return { x, y };
      }
    }
  }
  throw new Error("symbol is not on map");
}

const dirs = [
  { y: -1, x: 0 }, // Top
  { y: 0, x: 1 }, // Right
  { y: 1, x: 0 }, // Bottom
  { y: 0, x: -1 }, // Left
] as const;

function calcPath(map: string[][], start: Vec2, end: Vec2) {
  const queue = [{ pos: start, dist: 0, path: new Array<Vec2>() }];
  const visited = new Set<string>();

  while (queue.length) {
    const current = queue.shift()!;
    visited.add(JSON.stringify(current.pos));
    const path = [...current.path, current.pos];

    if (current.pos.x === end.x && current.pos.y === end.y) return path;

    for (const dir of dirs) {
      const candidate = { pos: { x: current.pos.x + dir.x, y: current.pos.y + dir.y }, dist: current.dist + 1, path };
      const symbol = map[candidate.pos.y][candidate.pos.x];
      if (!symbol || symbol === "#" || visited.has(JSON.stringify(candidate.pos))) continue;
      queue.push(candidate);
    }
  }
  throw new Error("no route found");
}

function calcManhattanDist(a: Vec2, b: Vec2) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function solve(input: StringStream, minSave: number) {
  const map = input.readLines().map((line) => line.split(""));

  const start = find(map, "S");
  const end = find(map, "E");

  const path = calcPath(map, start, end);

  let cheats = 0;
  for (let i = 0; i < path.length; i++) {
    for (let j = i + 1; j < path.length; j++) {
      const dist = calcManhattanDist(path[i], path[j]);
      const saved = path.length - i - (path.length - j) - dist;
      if (dist >= 2 && dist <= 20 && saved >= minSave) {
        cheats++;
      }
    }
  }

  return cheats;
}
