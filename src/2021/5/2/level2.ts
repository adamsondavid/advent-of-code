import Level from "../../../utils/level";

type Vec2 = {
  readonly x: number;
  readonly y: number;
};

export default class extends Level {
  public run() {
    const overlaps = new Map<string, number>();

    for (const line of this.input.readLines()) {
      const [start, end]: Vec2[] = line
        .split(" -> ")
        .map((point) => ({ x: parseInt(point.split(",")[0]), y: parseInt(point.split(",")[1]) }));

      if (start.x === end.x)
        for (let y = Math.min(start.y, end.y); y <= Math.max(start.y, end.y); y++) {
          const position: Vec2 = { x: start.x, y };
          overlaps.set(JSON.stringify(position), (overlaps.get(JSON.stringify(position)) ?? 0) + 1);
        }
      else if (start.y === end.y)
        for (let x = Math.min(start.x, end.x); x <= Math.max(start.x, end.x); x++) {
          const position: Vec2 = { x, y: start.y };
          overlaps.set(JSON.stringify(position), (overlaps.get(JSON.stringify(position)) ?? 0) + 1);
        }
      else {
        let x = start.x;
        let y = start.y;
        while (x !== end.x && y !== end.y) {
          const position: Vec2 = { x, y };
          overlaps.set(JSON.stringify(position), (overlaps.get(JSON.stringify(position)) ?? 0) + 1);
          x += x === end.x ? 0 : x < end.x ? 1 : -1;
          y += y === end.y ? 0 : y < end.y ? 1 : -1;
        }
        const position: Vec2 = { x, y };
        overlaps.set(JSON.stringify(position), (overlaps.get(JSON.stringify(position)) ?? 0) + 1);
      }
    }

    return Array.from(overlaps.values()).filter((value) => value >= 2).length;
  }
}
