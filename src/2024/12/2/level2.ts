import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  let res = 0;
  const visited = new Set<string>();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (visited.has(JSON.stringify({ x, y }))) continue;

      const garden = map[y][x];
      const v = new Set<string>();
      const fences = {
        north: new Set<string>(),
        east: new Set<string>(),
        south: new Set<string>(),
        west: new Set<string>(),
      };
      const queue = [{ x, y }];
      while (queue.length) {
        const current = queue.shift()!;
        if (v.has(JSON.stringify(current))) continue;
        v.add(JSON.stringify(current));

        if (map[current.y + 1]?.[current.x] === garden) queue.push({ x: current.x, y: current.y + 1 });
        else fences.south.add(JSON.stringify(current));

        if (map[current.y]?.[current.x + 1] === garden) queue.push({ x: current.x + 1, y: current.y });
        else fences.east.add(JSON.stringify(current));

        if (map[current.y - 1]?.[current.x] === garden) queue.push({ x: current.x, y: current.y - 1 });
        else fences.north.add(JSON.stringify(current));

        if (map[current.y]?.[current.x - 1] === garden) queue.push({ x: current.x - 1, y: current.y });
        else fences.west.add(JSON.stringify(current));
      }
      v.forEach((e) => visited.add(e));

      let cost = 0;
      for (const f of Object.values(fences)) {
        while (f.size) {
          const queue = [[...f][0]];
          while (queue.length) {
            const current = queue.shift()!;
            f.delete(current);
            const p = JSON.parse(current);
            if (f.has(JSON.stringify({ x: p.x + 1, y: p.y }))) queue.push(JSON.stringify({ x: p.x + 1, y: p.y }));
            if (f.has(JSON.stringify({ x: p.x, y: p.y + 1 }))) queue.push(JSON.stringify({ x: p.x, y: p.y + 1 }));
            if (f.has(JSON.stringify({ x: p.x - 1, y: p.y }))) queue.push(JSON.stringify({ x: p.x - 1, y: p.y }));
            if (f.has(JSON.stringify({ x: p.x, y: p.y - 1 }))) queue.push(JSON.stringify({ x: p.x, y: p.y - 1 }));
          }
          cost++;
        }
      }

      res += v.size * cost;
    }
  }

  return res;
}
