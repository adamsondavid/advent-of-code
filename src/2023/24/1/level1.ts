import StringStream from "../../../utils/string-stream";

type Trace = Vec2 & { dx: number; dy: number };
type Vec2 = { x: number; y: number };

function calcIntersection(a: Trace, b: Trace) {
  const bt = (a.dx * a.y + a.dy * b.x - a.dy * a.x - a.dx * b.y) / (a.dx * b.dy - a.dy * b.dx);
  const at = (b.x + bt * b.dx - a.x) / a.dx;
  const intersection = { x: a.x + at * a.dx, y: a.y + at * a.dy };
  if (at < 0 || bt < 0) return "no intersection";
  if ([Infinity, -Infinity].includes(intersection.x)) return "no intersection";
  if ([Infinity, -Infinity].includes(intersection.y)) return "no intersection";
  return intersection;
}

export function solve(input: StringStream, bounds: { start: number; end: number }) {
  const traces = input.readLines().map((line) => {
    const [x, y, z, dx, dy, dz] = line.match(/-?\d+/g)!.map(Number);
    return { x, y, dx, dy };
  });

  const intersections = new Array<Vec2>();
  for (let i = 0; i < traces.length; i++)
    for (let j = i + 1; j < traces.length; j++) {
      const intersection = calcIntersection(traces[i], traces[j]);
      if (intersection !== "no intersection") intersections.push(intersection);
    }

  const intersectionsInBounds = intersections
    .filter(({ x }) => x >= bounds.start)
    .filter(({ x }) => x <= bounds.end)
    .filter(({ y }) => y >= bounds.start)
    .filter(({ y }) => y <= bounds.end);

  return intersectionsInBounds.length;
}
