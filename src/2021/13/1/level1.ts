import Level from "../../../utils/level";

type Vec2 = {
  x: number;
  y: number;
};

type Instruction = {
  readonly x?: number;
  readonly y?: number;
};

export default class extends Level {
  public run() {
    const input = this.input
      .readLines()
      .join("\n")
      .split("\n\n")
      .map((chunk) => chunk.split("\n"));

    const points: Vec2[] = input[0].map((line) => ({
      x: parseInt(line.split(",")[0]),
      y: parseInt(line.split(",")[1]),
    }));

    const instructions: Instruction[] = input[1]
      .map((instruction) => instruction.match(/fold along (?<axis>.)=(?<amount>.*)/)!.groups!)
      .map((group) => ({ [group.axis]: parseInt(group.amount) }));

    for (const instruction of instructions.slice(0, 1)) {
      for (const point of points) {
        if (instruction.x && point.x > instruction.x) point.x = instruction.x - (point.x - instruction.x);
        if (instruction.y && point.y > instruction.y) point.y = instruction.y - (point.y - instruction.y);
      }
    }

    return new Set(points.map((point) => JSON.stringify(point))).size;
  }
}
