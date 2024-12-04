import Level from "../../../utils/level";

type Vec2 = {
  x: number;
  y: number;
};

export default class extends Level {
  public run() {
    const field: string[][] = [];

    for (const line of this.input.readLines()) {
      const points: Vec2[] = line
        .split(" -> ")
        .map((point) => ({ x: parseInt(point.split(",")[0]), y: parseInt(point.split(",")[1]) }));

      for (const [pointAIndex, pointB] of points.slice(1).entries()) {
        const pointA = points[pointAIndex];
        if (pointA.x === pointB.x) {
          const x = pointA.x;
          for (let y = Math.min(pointA.y, pointB.y); y <= Math.max(pointA.y, pointB.y); y++) {
            if (!field[y]) field[y] = [];
            field[y][x] = "#";
          }
        } else if (pointA.y === pointB.y) {
          const y = pointA.y;
          if (!field[y]) field[y] = [];
          for (let x = Math.min(pointA.x, pointB.x); x <= Math.max(pointA.x, pointB.x); x++) {
            field[y][x] = "#";
          }
        }
      }
    }

    field[field.length + 1] = new Array(1000000).fill("#");
    let count = 0;

    while (true) {
      const sand = { x: 500, y: 0 };
      while (true) {
        if (!field[sand.y]) field[sand.y] = [];
        if (!field[sand.y + 1]) field[sand.y + 1] = [];
        if (!field[sand.y + 1][sand.x]) sand.y++;
        else if (!field[sand.y + 1][sand.x - 1]) {
          sand.x--;
          sand.y++;
        } else if (!field[sand.y + 1][sand.x + 1]) {
          sand.x++;
          sand.y++;
        } else {
          field[sand.y][sand.x] = "o";
          count++;
          if (sand.x === 500 && sand.y === 0) return count;
          else break;
        }
      }
    }
  }
}
