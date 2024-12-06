import StringStream from "../../../utils/string-stream";

const directions = [
  { y: -1, x: 0 }, // Top
  { y: 0, x: 1 }, // Right
  { y: 1, x: 0 }, // Bottom
  { y: 0, x: -1 }, // Left
] as const;

class Guard {
  private readonly position;
  private directionIndex = 0;

  private get direction() {
    return directions[this.directionIndex];
  }

  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  get currentPosition() {
    return { ...this.position };
  }

  get nextPosition() {
    return {
      x: this.position.x + this.direction.x,
      y: this.position.y + this.direction.y,
    };
  }

  move() {
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }

  turn() {
    this.directionIndex = (this.directionIndex + 1) % directions.length;
  }
}

function findGuard(map: string[][]) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "^") {
        return new Guard(x, y);
      }
    }
  }
  throw new Error("no guard found on the map");
}

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  const guard = findGuard(map);
  const visited = new Set<string>();
  while (map[guard.y]?.[guard.x]) {
    visited.add(JSON.stringify(guard.currentPosition));
    if (map[guard.nextPosition.y]?.[guard.nextPosition.x] === "#") guard.turn();
    else guard.move();
  }
  return visited.size;
}
