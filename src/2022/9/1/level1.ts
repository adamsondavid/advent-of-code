import Level from "../../../utils/level";
import Rope from "../rope";
import { DOWN, LEFT, RIGHT, UP } from "../directions";

export default class extends Level {
  public run() {
    const directions = this.input
      .readLines()
      .flatMap((line) => {
        const [direction, steps] = line.split(" ");
        return new Array(parseInt(steps)).fill(direction);
      })
      .map((direction) => {
        if (direction === "U") return UP;
        if (direction === "R") return RIGHT;
        if (direction === "D") return DOWN;
        if (direction === "L") return LEFT;
        throw new Error("unknown direction: " + direction);
      });

    const rope = new Rope(2);
    const tailPositions = directions.map((direction) => {
      rope.move(direction);
      return JSON.stringify(rope.tail);
    });

    return new Set(tailPositions).size;
  }
}
