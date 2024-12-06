import StringStream from "../../../utils/string-stream";

const directions = [
  { y: -1, x: 0 }, // Top
  { y: 0, x: 1 }, // Right
  { y: 1, x: 0 }, // Bottom
  { y: 0, x: -1 }, // Left
] as const;

class Guard {
  private readonly position;
  private directionIndex;

  private get direction() {
    return directions[this.directionIndex];
  }

  constructor(x: number, y: number, directionIndex?: number) {
    this.position = { x, y };
    this.directionIndex = directionIndex ?? 0;
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  get currentDirection() {
    return this.directionIndex;
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
  const visitedWithDirection = new Set<string>();
  const obstacles = new Set<string>();

  while (map[guard.y]?.[guard.x]) {
    const obstacle = guard.nextPosition;
    if (
      map[obstacle.y]?.[obstacle.x] &&
      map[obstacle.y][obstacle.x] !== "#" &&
      !visited.has(JSON.stringify(obstacle))
    ) {
      const visitedWithDirection1 = new Set(visitedWithDirection);
      const guard1 = new Guard(guard.x, guard.y, guard.currentDirection);
      while (map[guard1.y]?.[guard1.x]) {
        if (visitedWithDirection1.has(JSON.stringify(guard1))) {
          obstacles.add(JSON.stringify(obstacle));
          break;
        }
        visitedWithDirection1.add(JSON.stringify(guard1));
        if (
          (guard1.nextPosition.x === obstacle.x && guard1.nextPosition.y === obstacle.y) ||
          map[guard1.nextPosition.y]?.[guard1.nextPosition.x] === "#"
        ) {
          guard1.turn();
        } else guard1.move();
      }
    }

    visited.add(JSON.stringify(guard.currentPosition));
    visitedWithDirection.add(JSON.stringify(guard));

    if (map[guard.nextPosition.y]?.[guard.nextPosition.x] === "#") guard.turn();
    else guard.move();
  }

  return obstacles.size;
}
