import StringStream from "../../../utils/string-stream";

type Vec2 = { x: number; y: number };
type Map = string[][];

function expandMap(map: Map) {
  const newMap: Map = [];
  for (let y = 0; y < map.length; y++) {
    newMap.push([]);
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") newMap[y].push("#", "#");
      if (map[y][x] === "O") newMap[y].push("[", "]");
      if (map[y][x] === ".") newMap[y].push(".", ".");
      if (map[y][x] === "@") newMap[y].push("@", ".");
    }
  }
  return newMap;
}

function findRobot(map: Map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "@") {
        return { x, y };
      }
    }
  }
  throw new Error("no robot found on the map");
}

const dirs = {
  "^": { y: -1, x: 0 },
  ">": { y: 0, x: 1 },
  v: { y: 1, x: 0 },
  "<": { y: 0, x: -1 },
} as Record<string, Vec2>;

export function solve(input: StringStream) {
  let [_map, _moves] = input.readLines().join("\n").split("\n\n");

  const moves = _moves.split("\n").join("");
  const map = expandMap(_map.split("\n").map((line) => line.split("")));
  const robot = findRobot(map);

  outer: for (const move of moves) {
    const dir = dirs[move];
    const queue = [{ ...robot }];
    const tilesToMove = new Set<string>();
    while (queue.length) {
      const current = queue.pop()!;
      tilesToMove.add(JSON.stringify(current));
      const candiate = { x: current.x + dir.x, y: current.y + dir.y };

      if (map[candiate.y][candiate.x] === "#") continue outer;
      if (!tilesToMove.has(JSON.stringify(candiate))) {
        if (map[candiate.y][candiate.x] === "[") {
          queue.push(candiate);
          queue.push({ ...candiate, x: candiate.x + 1 });
        }
        if (map[candiate.y][candiate.x] === "]") {
          queue.push(candiate);
          queue.push({ ...candiate, x: candiate.x - 1 });
        }
      }
    }

    robot.x += dir.x;
    robot.y += dir.y;
    const tiles = [...tilesToMove]
      .map((tile) => JSON.parse(tile))
      .map((tile) => ({ ...tile, symbol: map[tile.y][tile.x] }));
    for (const tile of tiles) {
      map[tile.y][tile.x] = ".";
    }
    for (const tile of tiles) {
      map[tile.y + dir.y][tile.x + dir.x] = tile.symbol;
    }
  }

  let res = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "[") {
        res += y * 100 + x;
      }
    }
  }
  return res;
}
