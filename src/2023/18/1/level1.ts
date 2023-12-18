import StringStream from "../../../utils/string-stream";

const dirs = {
  U: { y: -1, x: 0 },
  R: { y: 0, x: 1 },
  D: { y: 1, x: 0 },
  L: { y: 0, x: -1 },
};

function getBorder(steps: Array<{ direction: keyof typeof dirs; steps: number }>) {
  const border = new Array<{ x: number; y: number }>();
  const current = { x: 0, y: 0, dir: dirs.R };
  for (const step of steps) {
    current.dir = dirs[step.direction];
    for (let i = 0; i < step.steps; i++) {
      current.x += current.dir.x;
      current.y += current.dir.y;
      border.push({ x: current.x, y: current.y });
    }
  }
  return border;
}

export function solve(input: StringStream) {
  const steps = input.readLines().map((line) => ({
    direction: line.match(/[UDLR]/)![0] as keyof typeof dirs,
    steps: parseInt(line.match(/\d+/)![0]),
  }));

  const visited = new Set(getBorder(steps).map((pos) => JSON.stringify(pos)));
  const queue = [
    {
      x: dirs[steps[0].direction].x + dirs[steps[1].direction].x,
      y: dirs[steps[0].direction].y + dirs[steps[1].direction].y,
    },
  ];
  while (queue.length) {
    const current = queue.shift()!;
    if (visited.has(JSON.stringify(current))) continue;
    visited.add(JSON.stringify(current));
    queue.push(...Object.values(dirs).map((pos) => ({ x: current.x + pos.x, y: current.y + pos.y })));
  }
  return visited.size;
}
