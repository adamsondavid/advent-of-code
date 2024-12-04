import Level from "../../../utils/level";
import StringStream from "../../../utils/string-stream";

interface Vec2 {
  readonly x: number;
  readonly y: number;
}

interface Sensor {
  readonly position: Vec2;
  readonly radius: number;
}

function distance(a: Vec2, b: Vec2) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export default class extends Level {
  private readonly maxXY;

  public constructor(input: StringStream, maxXY: number) {
    super(input);
    this.maxXY = maxXY;
  }

  public run() {
    const sensors: Sensor[] = this.input.readLines().map((line) => {
      const regex = /Sensor at x=(?<sX>.*), y=(?<sY>.*): closest beacon is at x=(?<bX>.*), y=(?<bY>.*)/;
      const { groups } = line.match(regex)!;

      const position = { x: parseInt(groups!.sX), y: parseInt(groups!.sY) };
      const beacon = { x: parseInt(groups!.bX), y: parseInt(groups!.bY) };

      return { position, radius: distance(position, beacon) };
    });

    for (const sensor of sensors) {
      const positions = [];

      const n: Vec2 = { x: sensor.position.x, y: sensor.position.y - sensor.radius - 1 };
      const e: Vec2 = { x: sensor.position.x + sensor.radius + 1, y: sensor.position.y };
      const s: Vec2 = { x: sensor.position.x, y: sensor.position.y + sensor.radius + 1 };
      const w: Vec2 = { x: sensor.position.x - sensor.radius - 1, y: sensor.position.y };

      let x;
      let y;

      x = n.x;
      y = n.y;
      while (x < e.x && y < e.y) {
        if (x >= 0 && x <= this.maxXY && y >= 0 && y <= this.maxXY) positions.push({ x, y });
        x++;
        y++;
      }

      x = e.x;
      y = e.y;
      while (x > s.x && y < s.y) {
        if (x >= 0 && x <= this.maxXY && y >= 0 && y <= this.maxXY) positions.push({ x, y });
        x--;
        y++;
      }

      x = s.x;
      y = s.y;
      while (x > w.x && y > w.y) {
        if (x >= 0 && x <= this.maxXY && y >= 0 && y <= this.maxXY) positions.push({ x, y });
        x--;
        y--;
      }

      x = w.x;
      y = w.y;
      while (x < n.x && y > n.y) {
        if (x >= 0 && x <= this.maxXY && y >= 0 && y <= this.maxXY) positions.push({ x, y });
        x++;
        y--;
      }

      for (const position of positions) {
        const unreachable = sensors
          .map((sensor) => distance(sensor.position, position) <= sensor.radius)
          .every((reachable) => !reachable);
        if (unreachable) return position.x * 4000000 + position.y;
      }
    }
  }
}
