import StringStream from "../../../utils/string-stream";

type Vec2 = Readonly<{ x: number; y: number }>;

const adjacentCoords = [
  { y: -1, x: 0, symbol: "^" }, // Top
  { y: 0, x: 1, symbol: ">" }, // Right
  { y: 1, x: 0, symbol: "v" }, // Bottom
  { y: 0, x: -1, symbol: "<" }, // Left
];

const vec2ToString = (vec: Vec2) => `x: ${vec.x}, y: ${vec.y}`;

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));
  const end = { x: map[0].length - 2, y: map.length - 1 };
  const paths = [[{ x: 1, y: 0 }]];
  let maxPathLength = 0;
  while (paths.length) {
    const path = paths.shift()!;
    const current = path.at(-1)!;
    if (vec2ToString(current) === vec2ToString(end) && path.length - 1 > maxPathLength) {
      maxPathLength = path.length - 1;
      continue;
    }
    const neighbours = adjacentCoords
      .map((coord) => ({ x: coord.x + current.x, y: coord.y + current.y, symbol: coord.symbol }))
      .filter((coord) => {
        const currentSymbol = map[current.y][current.x];
        if (currentSymbol !== "." && currentSymbol !== coord.symbol) return false;
        const nextSymbol = map[coord.y]?.[coord.x];
        return nextSymbol && nextSymbol !== "#";
      })
      .map((coord) => ({ x: coord.x, y: coord.y }))
      .filter((coord) => !path.find((visited) => vec2ToString(visited) === vec2ToString(coord)));
    for (const neighbour of neighbours) paths.push([...path, neighbour]);
  }

  return maxPathLength;
}
