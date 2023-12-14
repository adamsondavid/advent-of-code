import StringStream from "../../../utils/string-stream";

type Vec2 = { x: number; y: number };

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));
  const rocks = new Array<Vec2>();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O") {
        rocks.push({ x, y });
      }
    }
  }

  let moving;
  do {
    moving = false;
    for (const rock of rocks) {
      if (map[rock.y - 1]?.[rock.x] === ".") {
        moving = true;
        map[rock.y][rock.x] = ".";
        rock.y--;
        map[rock.y][rock.x] = "O";
      }
    }
  } while (moving);

  return rocks.map((rock) => map.length - rock.y).reduce((sum, rockWeight) => sum + rockWeight);
}
