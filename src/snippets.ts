import StringStream from "./utils/string-stream";

/** 2D Adjacent Coordinates */
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

/** 2d Map Iteration */
function solve2dMap(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {}
  }
}

/** Procedural */
function solveProcedural(input: StringStream) {
  let ans = 0;
  for (const line of input.readLines()) {
  }
  return ans;
}
