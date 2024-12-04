import StringStream from "../../../utils/string-stream";

type Vec2 = Readonly<{ x: number; y: number }>;

const adjacentCoords: Vec2[] = [
  { y: -1, x: 0 }, // Top
  { y: 0, x: 1 }, // Right
  { y: 1, x: 0 }, // Bottom
  { y: 0, x: -1 }, // Left
];

const vec2ToString = (vec: Vec2) => `x: ${vec.x}, y: ${vec.y}`;
const stringToVec2 = (string: string): Vec2 => {
  const [x, y] = string.match(/\d+/g)!.map(Number);
  return { x, y };
};

function dist(map: string[][], start: Vec2, end: Vec2) {
  const visited = new Set<string>();
  const open = [{ current: start, dist: 0 }];
  while (open.length) {
    const { current, dist } = open.shift()!;
    if (vec2ToString(current) === vec2ToString(end)) return dist;
    if (visited.has(vec2ToString(current))) continue;
    visited.add(vec2ToString(current));
    open.push(
      ...adjacentCoords
        .map((coord) => ({ current: { x: coord.x + current.x, y: coord.y + current.y }, dist: dist + 1 }))
        .filter((coord) => map[coord.current.y]?.[coord.current.x] === "."),
    );
  }
  throw new Error("nodes are not connected!");
}

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split("").map((symbol) => symbol.replace(/[<>v^]/g, ".")));

  const graph = new Map<string, Map<string, number>>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") continue;
      const curr = vec2ToString({ x, y });
      const neighbours = adjacentCoords
        .map((coord) => ({ x: coord.x + x, y: coord.y + y }))
        .filter((coord) => map[coord.y]?.[coord.x] === ".")
        .map((coord) => [vec2ToString(coord), Infinity] as const);
      if (neighbours.length) graph.set(curr, new Map(neighbours));
    }
  }
  let nodes = [];
  while ((nodes = [...graph.entries()].filter(([, neighbours]) => neighbours.size === 2)).length) {
    for (const [node, neighbours] of nodes) {
      graph.delete(node);
      for (const k of graph.values()) {
        if (k.has(node)) {
          k.delete(node);
          for (const [neighbour] of neighbours) {
            if (!k.has(neighbour)) k.set(neighbour, Infinity);
          }
        }
      }
    }
  }
  for (const [node, neighbours] of graph.entries()) {
    for (const neighbour of neighbours.keys()) {
      if (node === neighbour) neighbours.delete(neighbour);
      if (!graph.has(neighbour)) neighbours.delete(neighbour);
    }
  }
  for (const [node, neighbours] of graph.entries()) {
    for (const neighbour of neighbours.keys()) {
      neighbours.set(neighbour, dist(map, stringToVec2(node), stringToVec2(neighbour)));
    }
  }

  const end = vec2ToString({ x: map[0].length - 2, y: map.length - 1 });
  const paths = [{ path: [vec2ToString({ x: 1, y: 0 })], dist: 0 }];
  let res = 0;
  while (paths.length) {
    const { path, dist } = paths.shift()!;
    const current = path.at(-1)!;
    if (current === end && dist > res) {
      res = dist;
      console.log(res);
      continue;
    }
    const neighbours = graph.get(current)!;
    for (const [neighbour, d] of neighbours.entries()) {
      if (!path.includes(neighbour)) paths.push({ path: [...path, neighbour], dist: dist + d });
    }
  }
  return graph;
}
