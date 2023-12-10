import StringStream from "../../../utils/string-stream";

function findStart(map: string[][]) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") return { x, y };
    }
  }
  throw new Error("no start found");
}

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  const start = findStart(map);

  const closed = new Map<string, number>();
  const open = [{ coord: start, distance: 0 }];
  while (open.length) {
    const current = open.shift()!;
    if (closed.has(JSON.stringify(current.coord))) continue;
    closed.set(JSON.stringify(current.coord), current.distance);

    const currentSymbol = map[current.coord.y][current.coord.x];

    const northSymbol = map[current.coord.y - 1]?.[current.coord.x];
    if (["S", "|", "L", "J"].includes(currentSymbol) && ["S", "|", "7", "F"].includes(northSymbol))
      open.push({ coord: { x: current.coord.x, y: current.coord.y - 1 }, distance: current.distance + 1 });

    const eastSymbol = map[current.coord.y]?.[current.coord.x + 1];
    if (["S", "-", "L", "F"].includes(currentSymbol) && ["S", "-", "J", "7"].includes(eastSymbol))
      open.push({ coord: { x: current.coord.x + 1, y: current.coord.y }, distance: current.distance + 1 });

    const southSymbol = map[current.coord.y + 1]?.[current.coord.x];
    if (["S", "|", "7", "F"].includes(currentSymbol) && ["S", "|", "L", "J"].includes(southSymbol))
      open.push({ coord: { x: current.coord.x, y: current.coord.y + 1 }, distance: current.distance + 1 });

    const westSymbol = map[current.coord.y]?.[current.coord.x - 1];
    if (["S", "-", "J", "7"].includes(currentSymbol) && ["S", "-", "L", "F"].includes(westSymbol))
      open.push({ coord: { x: current.coord.x - 1, y: current.coord.y }, distance: current.distance + 1 });
  }

  return Math.max(...closed.values());
}
