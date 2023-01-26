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

    for (const instruction of instructions) {
      for (const point of points) {
        if (instruction.x && point.x > instruction.x) point.x = instruction.x - (point.x - instruction.x);
        if (instruction.y && point.y > instruction.y) point.y = instruction.y - (point.y - instruction.y);
      }
    }

    const frame: string[][] = [];
    for (const point of points) {
      if (!frame[point.y]) frame[point.y] = Array(Math.max(...points.map((point) => point.x))).fill(" ");
      frame[point.y][point.x] = "#";
    }
    return frame.map((line) => line.join(""));
  }
}
