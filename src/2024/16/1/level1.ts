import StringStream from "../../../utils/string-stream";
import Heap from "heap-js";

function find(map: { symbol: string }[][], symbol: string) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].symbol === symbol) return { x, y };
    }
  }
  throw new Error("symbol not found on the map");
}

export function solve(input: StringStream) {
  const map = input.readLines().map((line, y) =>
    line.split("").map((symbol, x) => ({
      symbol,
      n: { x, y, dirName: "n", dir: { x: 0, y: -1 } },
      s: { x, y, dirName: "s", dir: { x: 0, y: 1 } },
      w: { x, y, dirName: "w", dir: { x: -1, y: 0 } },
      e: { x, y, dirName: "e", dir: { x: 1, y: 0 } },
    })),
  );

  const end = find(map, "E");
  const reindeer = find(map, "S");

  const queue = Heap.heapify([{ node: map[reindeer.y][reindeer.x].e, dist: 0 }], (a, b) => a.dist - b.dist);
  const visited = new Set<typeof map[number][number]["n"]>();

  while (queue.length) {
    const current = queue.pop()!;

    if (visited.has(current.node)) continue;
    visited.add(current.node);

    if (current.node.x === end.x && current.node.y === end.y) return current.dist;

    const nexts = [
      {
        dist: current.dist + 1,
        node: map[current.node.y + current.node.dir.y]?.[current.node.x + current.node.dir.x]?.[
          current.node.dirName as "n"
        ],
      },
    ];
    if (current.node.dirName === "w" || current.node.dirName === "e") {
      nexts.push({ dist: current.dist + 1000, node: map[current.node.y][current.node.x].n });
      nexts.push({ dist: current.dist + 1000, node: map[current.node.y][current.node.x].s });
    }
    if (current.node.dirName === "n" || current.node.dirName === "s") {
      nexts.push({ dist: current.dist + 1000, node: map[current.node.y][current.node.x].e });
      nexts.push({ dist: current.dist + 1000, node: map[current.node.y][current.node.x].w });
    }
    for (const next of nexts)
      if (next.node && map[next.node.y][next.node.x].symbol !== "#" && !visited.has(next.node)) queue.push(next);
  }
}
