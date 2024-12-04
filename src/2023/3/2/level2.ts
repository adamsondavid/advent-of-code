import Level from "../../../utils/level";

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

export default class extends Level {
  public run() {
    const map = this.input.readLines().map((line) => line.split(""));
    const gears = new Map<string, number[]>();

    let partialNumber = "";
    const adjacentGears = new Set<string>();
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const maybeDigit = map[y][x];
        if (!isNaN(parseInt(maybeDigit))) {
          partialNumber += maybeDigit;
          adjacentCoords
            .map((coord) => ({ x: coord.x + x, y: coord.y + y }))
            .filter((coord) => map[coord.y]?.[coord.x] === "*")
            .forEach((coord) => adjacentGears.add(JSON.stringify(coord)));
        } else {
          adjacentGears.forEach((gear) => gears.set(gear, [...(gears.get(gear) ?? []), parseInt(partialNumber)]));
          partialNumber = "";
          adjacentGears.clear();
        }
      }
      adjacentGears.forEach((gear) => gears.set(gear, [...(gears.get(gear) ?? []), parseInt(partialNumber)]));
      partialNumber = "";
      adjacentGears.clear();
    }

    return [...gears.values()]
      .filter((numbers) => numbers.length === 2)
      .map(([a, b]) => a * b)
      .reduce((a, b) => a + b, 0);
  }
}
