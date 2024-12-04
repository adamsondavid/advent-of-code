import Level from "../../../utils/level";

type Vec2 = { readonly x: number; readonly y: number };

const UP: Vec2 = { x: 0, y: -1 };
const RIGHT: Vec2 = { x: 1, y: 0 };
const DOWN: Vec2 = { x: 0, y: 1 };
const LEFT: Vec2 = { x: -1, y: 0 };
const directions: Vec2[] = [UP, RIGHT, DOWN, LEFT];

export default class extends Level {
  public run() {
    const map = this.input.readLines().map((line) => line.split("").map((char) => parseInt(char)));

    const lowPoints: number[] = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        const height = map[y][x];
        const surroundingHeights = directions.map((direction) => map[y + direction.y]?.[x + direction.x] ?? Infinity);
        if (surroundingHeights.every((surroundingHeight) => height < surroundingHeight)) lowPoints.push(height);
      }
    }

    return lowPoints.map((point) => point + 1).reduce((a, b) => a + b, 0);
  }
}
