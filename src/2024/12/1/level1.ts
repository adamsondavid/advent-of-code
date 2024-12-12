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
      const queue = [{ x, y }];
      let cost = 0;
      while (queue.length) {
        const current = queue.shift()!;
        if (v.has(JSON.stringify(current))) continue;
        v.add(JSON.stringify(current));

        if (map[current.y + 1]?.[current.x] === garden) queue.push({ x: current.x, y: current.y + 1 });
        else cost++;

        if (map[current.y]?.[current.x + 1] === garden) queue.push({ x: current.x + 1, y: current.y });
        else cost++;

        if (map[current.y - 1]?.[current.x] === garden) queue.push({ x: current.x, y: current.y - 1 });
        else cost++;

        if (map[current.y]?.[current.x - 1] === garden) queue.push({ x: current.x - 1, y: current.y });
        else cost++;
      }
      v.forEach((e) => visited.add(e));

      res += v.size * cost;
    }
  }

  return res;
}
