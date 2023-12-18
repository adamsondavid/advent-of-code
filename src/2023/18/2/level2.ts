import StringStream from "../../../utils/string-stream";

const dirs = {
  0: { y: 0, x: 1 },
  1: { y: 1, x: 0 },
  2: { y: 0, x: -1 },
  3: { y: -1, x: 0 },
};

function getBorder(steps: Array<{ direction: keyof typeof dirs; steps: number }>) {
  const border = new Array<{ x: number; y: number }>();
  const current = { x: 0, y: 0, dir: dirs[0] };
  for (const step of steps) {
    current.dir = dirs[step.direction];
    current.x += current.dir.x * step.steps;
    current.y += current.dir.y * step.steps;
    border.push({ x: current.x, y: current.y });
  }
  return border;
}

export function solve(input: StringStream) {
  const steps = input.readLines().map((line) => {
    const hex = line.split(" ")[2].match(/[a-f\d]+/)![0];
    return { steps: parseInt(hex.substring(0, 5), 16), direction: parseInt(hex.at(-1)!) as keyof typeof dirs };
  });

  const points = getBorder(steps);
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points.at(i - 1)!;
    const b = points.at(i)!;
    sum += a.x * b.y - a.y * b.x;
  }
  return Math.round(sum / 2 + 1 + (steps.map((step) => step.steps).reduce((a, b) => a + b) - 1) / 2);
}
