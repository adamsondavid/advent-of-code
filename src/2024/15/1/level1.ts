import StringStream from "../../../utils/string-stream";

type Vec2 = { x: number; y: number };
type Map = string[][];

function findRobot(map: Map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "@") {
        map[y][x] = ".";
        return { x, y };
      }
    }
  }
  throw new Error("no robot found on the map");
}

function findBoxes(map: Map) {
  const boxes: Vec2[] = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O") {
        map[y][x] = ".";
        boxes.push({ x, y });
      }
    }
  }
  return boxes;
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
  const map = _map.split("\n").map((line) => line.split(""));

  const robot = findRobot(map);
  const boxes = findBoxes(map);

  outer: for (const move of moves) {
    const dir = dirs[move];
    const next = { ...robot };
    const boxesInFront: Vec2[] = [];
    while (true) {
      next.x += dir.x;
      next.y += dir.y;
      if (map[next.y]?.[next.x] === "#") continue outer;
      const box = boxes.find((box) => box.x === next.x && box.y === next.y);
      if (box) boxesInFront.push(box);
      else break;
    }
    robot.x += dir.x;
    robot.y += dir.y;
    for (const box of boxesInFront) {
      box.x += dir.x;
      box.y += dir.y;
    }
  }

  let res = 0;
  for (const box of boxes) res += box.x + box.y * 100;
  return res;
}
