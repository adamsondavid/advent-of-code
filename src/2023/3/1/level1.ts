import Level from "../../../utils/level";

type Vec2 = { x: number; y: number };

const adjacentCoords: Vec2[] = [
  { y: -1, x: 0 }, // Top
  { y: -1, x: 1 }, // Top Right
  { y: 0, x: 1 }, // Right
  { y: 1, x: 1 }, // Bottom Right
  { y: 1, x: 0 }, // Bottom
  { y: 1, x: -1 }, // Bottom Left
  { y: 0, x: -1 }, // Left
  { y: 0 - 1, x: -1 }, // Top Left
];

const isSymbol = (char?: string) => ![undefined, ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char);

export default class extends Level {
  public run() {
    const map = this.input.readLines().map((line) => line.split(""));
    const partNumbers = new Array<number>();

    let partialNumber = "";
    let partNumberDetected = false;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const maybeDigit = map[y][x];
        if (!isNaN(parseInt(maybeDigit))) {
          partialNumber += maybeDigit;
          partNumberDetected ||= adjacentCoords
            .map((coord) => map[coord.y + y]?.[coord.x + x])
            .some((maybeSymbol) => isSymbol(maybeSymbol));
        } else {
          if (partNumberDetected) partNumbers.push(parseInt(partialNumber));
          partialNumber = "";
          partNumberDetected = false;
        }
      }
      if (partNumberDetected) partNumbers.push(parseInt(partialNumber));
      partialNumber = "";
      partNumberDetected = false;
    }

    return partNumbers.reduce((sum, partNumber) => sum + partNumber, 0);
  }
}
