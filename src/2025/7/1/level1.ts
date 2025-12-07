import StringStream from "../../../utils/string-stream";

type Vec2 = {
  x: number;
  y: number;
};

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  const start: Vec2 = { x: 0, y: 0 };
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") {
        start.x = x;
        start.y = y;
      }
    }
  }

  let res = 0;
  const visited = new Set<string>();
  const beams = [start];
  while (beams.length > 0) {
    const beam = beams.shift()!;
    if (visited.has(JSON.stringify(beam))) continue;
    visited.add(JSON.stringify(beam));
    beam.y++;
    if (map[beam.y][beam.x] === "^") {
      beams.push({ x: beam.x - 1, y: beam.y });
      beams.push({ x: beam.x + 1, y: beam.y });
      res++;
    } else if (beam.y !== map.length - 1) {
      beams.push(beam);
    }
  }

  return res;
}
