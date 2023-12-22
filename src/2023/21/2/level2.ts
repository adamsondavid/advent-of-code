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

const mod = (n: number, m: number) => ((n % m) + m) % m;

const simplifiedLagrange = (values: number[]) => {
  return {
    a: values[0] / 2 - values[1] + values[2] / 2,
    b: -3 * (values[0] / 2) + 2 * values[1] - values[2] / 2,
    c: values[0],
  };
};

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));
  const s = start(map);
  const visited = new Map([[0, new Set([`${s.x} ${s.y}`])]]);
  const a = Math.floor(map.length / 2);
  const b = a + map.length;
  const c = a + map.length * 2;
  for (let i = 0; i < c; i++) {
    const nodes = visited.get(i)!;
    visited.set(i + 1, new Set());
    for (const currentString of nodes) {
      const [x, y] = currentString.match(/(-?\d+)/g)!.map(Number);
      adjacentCoords
        .map((pos) => ({ x: pos.x + x, y: pos.y + y }))
        .filter((pos) => [".", "S"].includes(map[mod(pos.y, map.length)]?.[mod(pos.x, map.length)]))
        .forEach((pos) => visited.get(i + 1)!.add(`${pos.x} ${pos.y}`));
    }
  }

  const poly = simplifiedLagrange([a, b, c].map((n) => visited.get(n)!.size));
  const target = (26_501_365 - 65) / 131;
  return poly.a * target * target + poly.b * target + poly.c;
}
