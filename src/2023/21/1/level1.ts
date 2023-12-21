import StringStream from "../../../utils/string-stream";

type Vec2 = Readonly<{ x: number; y: number }>;

const adjacentCoords: Vec2[] = [
  { y: -1, x: 0 }, // Top
  { y: 0, x: 1 }, // Right
  { y: 1, x: 0 }, // Bottom
  { y: 0, x: -1 }, // Left
];

function start(map: string[][]): Vec2 {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") return { x, y };
    }
  }
  throw new Error("so start point found!");
}

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));
  const visited = new Map([[0, new Set([JSON.stringify(start(map))])]]);
  for (let i = 0; i < 64; i++) {
    const nodes = visited.get(i)!;
    visited.set(i + 1, new Set());
    for (const currentString of nodes) {
      const current = JSON.parse(currentString);
      adjacentCoords
        .map((pos) => ({ x: pos.x + current.x, y: pos.y + current.y }))
        .filter((pos) => [".", "S"].includes(map[pos.y]?.[pos.x]))
        .forEach((pos) => visited.get(i + 1)!.add(JSON.stringify(pos)));
    }
  }
  return [...visited.values()].at(-1)!.size;
}
