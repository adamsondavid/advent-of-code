import StringStream from "../../../utils/string-stream";

const adjacentCoords = [
  { y: -1, x: 0 }, // Top
  { y: -1, x: 1 }, // Top Right
  { y: 0, x: 1 }, // Right
  { y: 1, x: 1 }, // Bottom Right
  { y: 1, x: 0 }, // Bottom
  { y: 1, x: -1 }, // Bottom Left
  { y: 0, x: -1 }, // Left
  { y: 0 - 1, x: -1 }, // Top Left
] as const;

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  let res = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y]?.[x] !== "@") continue;
      const adjacentPaperRolls = adjacentCoords
        .map((coord) => map[y + coord.y]?.[x + coord.x])
        .filter((c) => c === "@");
      if (adjacentPaperRolls.length < 4) res++;
    }
  }

  return res;
}
