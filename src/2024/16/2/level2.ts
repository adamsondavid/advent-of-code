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
      n: { x, y, dirName: "n", dir: { x: 0, y: -1 }, dist: Infinity, pre: [] as any[] },
      s: { x, y, dirName: "s", dir: { x: 0, y: 1 }, dist: Infinity, pre: [] as any[] },
      w: { x, y, dirName: "w", dir: { x: -1, y: 0 }, dist: Infinity, pre: [] as any[] },
      e: { x, y, dirName: "e", dir: { x: 1, y: 0 }, dist: Infinity, pre: [] as any[] },
    })),
  );

  const end = find(map, "E");
  const reindeer = find(map, "S");
  map[reindeer.y][reindeer.x].e.dist = 0;

  const queue = Heap.heapify(
    map.flat().flatMap((m) => [m.n, m.s, m.e, m.w]),
    (a, b) => a.dist - b.dist,
  );

  while (queue.length) {
    const current = queue.pop()!;

    if (current.x === end.x && current.y === end.y) {
      const seats = new Set<string>();
      const queue = [current];
      while (queue.length) {
        const current = queue.shift()!;
        seats.add(JSON.stringify({ x: current.x, y: current.y }));
        queue.push(...current.pre);
      }
      return seats.size;
    }

    const nexts = [
      {
        dist: current.dist + 1,
        node: map[current.y + current.dir.y]?.[current.x + current.dir.x]?.[current.dirName as "n"],
      },
    ];
    if (current.dirName === "w" || current.dirName === "e") {
      nexts.push({ dist: current.dist + 1000, node: map[current.y][current.x].n });
      nexts.push({ dist: current.dist + 1000, node: map[current.y][current.x].s });
    }
    if (current.dirName === "n" || current.dirName === "s") {
      nexts.push({ dist: current.dist + 1000, node: map[current.y][current.x].e });
      nexts.push({ dist: current.dist + 1000, node: map[current.y][current.x].w });
    }

    for (const next of nexts) {
      if (next.node && next.node.dist >= next.dist && map[next.node.y][next.node.x].symbol !== "#") {
        queue.remove(next.node);
        next.node.dist = next.dist;
        if (next.node.dist < next.dist) next.node.pre = [];
        next.node.pre.push(current);
        queue.add(next.node);
      }
    }
  }
}
