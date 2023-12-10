import StringStream from "../../../utils/string-stream";

type Vec2 = { x: number; y: number };

const adjacentCoords = [
  { y: -1, x: 0 }, // Top
  { y: 0, x: 1 }, // Right
  { y: 1, x: 0 }, // Bottom
  { y: 0, x: -1 }, // Left
] as const;

function findStart(map: string[][]) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") return { x, y };
    }
  }
  throw new Error("no start found");
}

function findMainLoop(map: string[][]) {
  const start = findStart(map);

  const closed = new Set<string>();
  const open = [start];
  while (open.length) {
    const current = open.pop()!;
    if (closed.has(JSON.stringify(current))) continue;
    closed.add(JSON.stringify(current));

    const currentSymbol = map[current.y][current.x];

    const northSymbol = map[current.y - 1]?.[current.x];
    if (["S", "|", "L", "J"].includes(currentSymbol) && ["S", "|", "7", "F"].includes(northSymbol))
      open.push({ x: current.x, y: current.y - 1 });

    const eastSymbol = map[current.y]?.[current.x + 1];
    if (["S", "-", "L", "F"].includes(currentSymbol) && ["S", "-", "J", "7"].includes(eastSymbol))
      open.push({ x: current.x + 1, y: current.y });

    const southSymbol = map[current.y + 1]?.[current.x];
    if (["S", "|", "7", "F"].includes(currentSymbol) && ["S", "|", "L", "J"].includes(southSymbol))
      open.push({ x: current.x, y: current.y + 1 });

    const westSymbol = map[current.y]?.[current.x - 1];
    if (["S", "-", "J", "7"].includes(currentSymbol) && ["S", "-", "L", "F"].includes(westSymbol))
      open.push({ x: current.x - 1, y: current.y });
  }

  const mainLoop = [...closed];
  mainLoop.push(mainLoop[0]);
  mainLoop.push(mainLoop[1]);
  return { mainLoop: mainLoop.map((coord) => JSON.parse(coord) as Vec2), mainLoopPoints: closed };
}

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));
  const { mainLoop, mainLoopPoints } = findMainLoop(map);

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (!mainLoopPoints.has(JSON.stringify({ x, y }))) map[y][x] = ".";
    }
  }

  const open = new Array<Vec2>();
  for (let i = 1; i < mainLoop.length - 1; i++) {
    const prev = mainLoop[i - 1];
    const current = mainLoop[i];
    const next = mainLoop[i + 1];
    const directions = [
      { x: current.x - prev.x, y: current.y - prev.y },
      { x: next.x - current.x, y: next.y - current.y },
    ];

    for (const direction of directions) {
      // Looking down
      if (direction.x === 0 && direction.y === 1) {
        const dot = { x: current.x + 1, y: current.y };
        if (map[dot.y][dot.x] === ".") open.push(dot);
      }

      // Looking right
      if (direction.x === 1 && direction.y === 0) {
        const dot = { x: current.x, y: current.y - 1 };
        if (map[dot.y][dot.x] === ".") open.push(dot);
      }

      // Looking up
      if (direction.x === 0 && direction.y === -1) {
        const dot = { x: current.x - 1, y: current.y };
        if (map[dot.y][dot.x] === ".") open.push(dot);
      }

      // Looking left
      if (direction.x === -1 && direction.y === 0) {
        const dot = { x: current.x, y: current.y + 1 };
        if (map[dot.y][dot.x] === ".") open.push(dot);
      }
    }
  }

  const closed = new Set<string>();
  while (open.length) {
    const current = open.pop()!;
    if (closed.has(JSON.stringify(current))) continue;
    closed.add(JSON.stringify(current));
    const adjacentDots = adjacentCoords
      .map((coord) => ({ x: current.x + coord.x, y: current.y + coord.y }))
      .filter((coord) => map[coord.y]?.[coord.x] === ".");
    open.push(...adjacentDots);
  }

  return closed.size;
}
