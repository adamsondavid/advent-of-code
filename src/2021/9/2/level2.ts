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

    const lowPoints: Vec2[] = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        const currentHeight = map[y][x];
        const surroundingHeights = directions.map((direction) => map[y + direction.y]?.[x + direction.x] ?? Infinity);
        if (surroundingHeights.every((surroundingHeight) => currentHeight < surroundingHeight))
          lowPoints.push({ x, y });
      }
    }

    const bazins: number[] = [];
    for (const lowPoint of lowPoints) {
      const visited = new Set<string>();
      const queue: Vec2[] = [lowPoint];

      while (queue.length) {
        const currentPosition = queue.pop()!;
        if (visited.has(JSON.stringify(currentPosition))) continue;
        visited.add(JSON.stringify(currentPosition));

        const currentHeight = map[currentPosition.y][currentPosition.x];
        directions
          .map((direction) => ({
            position: { x: currentPosition.x + direction.x, y: currentPosition.y + direction.y },
            height: map[currentPosition.y + direction.y]?.[currentPosition.x + direction.x] ?? -Infinity,
          }))
          .filter((surrounding) => surrounding.height > currentHeight)
          .filter((surrounding) => surrounding.height < 9)
          .forEach((surrounding) => queue.push(surrounding.position));
      }

      bazins.push(visited.size);
    }

    return bazins
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b, 1);
  }
}
