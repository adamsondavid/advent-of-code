import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split("").map(Number));

  const starts: { x: number; y: number }[] = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) starts.push({ x, y });
    }
  }

  let res = 0;
  for (const start of starts) {
    const queue = [start];
    const ends = new Set();
    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentHeight = map[current.y][current.x];
      if (currentHeight === 9) ends.add(JSON.stringify(current));
      if (map[current.y + 1]?.[current.x] === currentHeight + 1) queue.push({ x: current.x, y: current.y + 1 });
      if (map[current.y][current.x + 1] === currentHeight + 1) queue.push({ x: current.x + 1, y: current.y });
      if (map[current.y - 1]?.[current.x] === currentHeight + 1) queue.push({ x: current.x, y: current.y - 1 });
      if (map[current.y][current.x - 1] === currentHeight + 1) queue.push({ x: current.x - 1, y: current.y });
    }
    res += ends.size;
  }
  return res;
}
