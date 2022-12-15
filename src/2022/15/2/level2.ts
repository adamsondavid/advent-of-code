import Level from "../../../utils/level";
import StringStream from "../../../utils/string-stream";

interface Vec2 {
  readonly x: number;
  readonly y: number;
}

interface Sensor extends Vec2 {
  readonly beacon: Vec2;
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
    const sensors: Sensor[] = [];
    const grid: string[][] = [];

    const regex = /Sensor at x=(?<sX>.*), y=(?<sY>.*): closest beacon is at x=(?<bX>.*), y=(?<bY>.*)/;
    for (const line of this.input.readLines()) {
      const { groups } = line.match(regex)!;
      const beacon: Vec2 = { x: parseInt(groups!.bX), y: parseInt(groups!.bY) };
      const sensor: Sensor = { x: parseInt(groups!.sX), y: parseInt(groups!.sY), beacon: beacon };

      sensors.push(sensor);
      if (!grid[sensor.y]) grid[sensor.y] = [];
      grid[sensor.y][sensor.x] = "S";

      if (!grid[beacon.y]) grid[beacon.y] = [];
      grid[beacon.y][beacon.x] = "B";
    }

    for (const [i, sensor] of sensors.entries()) {
      console.log(`processing sensor ${i} of ${sensors.length - 1}`);
      const beacon = sensor.beacon;
      const d = distance(sensor, beacon);
      for (let y = Math.max(0, sensor.y - d); y <= Math.min(sensor.y + d, this.maxXY); y++) {
        if (!grid[y]) grid[y] = [];
        for (let x = Math.max(0, sensor.x - d); x <= Math.min(sensor.x + d, this.maxXY); x++) {
          if (distance(sensor, { x, y }) <= d) {
            if (!grid[y][x]) grid[y][x] = "#";
          }
        }
      }
    }

    for (let y = 0; y <= this.maxXY; y++) {
      for (let x = 0; x <= this.maxXY; x++) {
        if (!grid[y][x]) return x * 4000000 + y;
      }
    }
  }
}
