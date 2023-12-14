import StringStream from "../../../utils/string-stream";

type Vec2 = { x: number; y: number };

const directions = [
  { y: -1, x: 0 }, // North
  { y: 0, x: -1 }, // West
  { y: 1, x: 0 }, // South
  { y: 0, x: 1 }, // East
] as const;

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));
  const _rocks = new Array<Vec2>();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O") {
        _rocks.push({ x, y });
      }
    }
  }

  const rocks = directions.map((dir) =>
    [..._rocks]
      .map((rock) => ({ rock, dir: rock.x * dir.x + rock.y * dir.y }))
      .sort((a, b) => b.dir - a.dir)
      .map((rock) => rock.rock),
  );

  const iterationByMap = new Map<string, number>();

  const iterations = 1000000000;
  for (let i = 0; i < iterations; i++) {
    for (const [d, direction] of directions.entries()) {
      let moving;
      do {
        moving = false;
        for (const rock of rocks[d]) {
          if (map[rock.y + direction.y]?.[rock.x + direction.x] === ".") {
            moving = true;
            map[rock.y][rock.x] = ".";
            rock.y += direction.y;
            rock.x += direction.x;
            map[rock.y][rock.x] = "O";
          }
        }
      } while (moving);
    }
    const currentMap = JSON.stringify(map);
    const lastTimeSeen = iterationByMap.get(currentMap);
    if (lastTimeSeen) {
      const cycleSize = i - lastTimeSeen;
      const cycles = Math.floor((iterations - i) / cycleSize);
      i += cycleSize * cycles;
    } else iterationByMap.set(currentMap, i);
  }

  return rocks[0].map((rock) => map.length - rock.y).reduce((sum, rockWeight) => sum + rockWeight);
}
