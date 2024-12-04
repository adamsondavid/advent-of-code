import Level from "../../../utils/level";
import StringStream from "../../../utils/string-stream";

interface Vec2 {
  readonly x: number;
  readonly y: number;
}

interface Sensor {
  readonly position: Vec2;
  readonly beacon: Vec2;
}

function distance(a: Vec2, b: Vec2) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export default class extends Level {
  private readonly y;

  public constructor(input: StringStream, y: number) {
    super(input);
    this.y = y;
  }

  public run() {
    const sensors: Sensor[] = [];
    const row: { [key: string]: string } = {};

    for (const line of this.input.readLines()) {
      const regex = /Sensor at x=(?<sX>.*), y=(?<sY>.*): closest beacon is at x=(?<bX>.*), y=(?<bY>.*)/;
      const { groups } = line.match(regex)!;
      const beacon: Vec2 = { x: parseInt(groups!.bX), y: parseInt(groups!.bY) };
      const sensor: Sensor = { position: { x: parseInt(groups!.sX), y: parseInt(groups!.sY) }, beacon: beacon };

      sensors.push(sensor);
      if (sensor.position.y === this.y) row[sensor.position.x] = "S";
      if (beacon.y === this.y) row[beacon.x] = "B";
    }

    for (const sensor of sensors) {
      const d = distance(sensor.position, sensor.beacon);
      for (let x = sensor.position.x - d; x <= sensor.position.x + d; x++) {
        if (distance(sensor.position, { x, y: this.y }) <= d) {
          if (!row[x]) row[x] = "#";
        }
      }
    }

    return Object.entries(row).filter(([, value]) => value === "#").length;
  }
}
