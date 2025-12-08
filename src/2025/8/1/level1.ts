import StringStream from "../../../utils/string-stream";

type Vec3 = {
  x: number;
  y: number;
  z: number;
};

type Node = {
  position: Vec3;
  neighbors: Node[];
};

function distance(a: Vec3, b: Vec3) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));
}

export function solve(input: StringStream, wireCount: number) {
  const nodes: Node[] = input.readLines().map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return { position: { x, y, z }, neighbors: [] };
  });

  const distances = nodes
    .flatMap((a, index) =>
      nodes
        .slice(index)
        .filter((b) => a !== b)
        .map((b) => ({ a, b, distance: distance(a.position, b.position) })),
    )
    .sort((a, b) => a.distance - b.distance);

  for (let i = 0; i < wireCount; i++) {
    distances[i].a.neighbors.push(distances[i].b);
    distances[i].b.neighbors.push(distances[i].a);
  }

  const visited = new Set<Node>();
  const circuits = [];
  for (const node of nodes) {
    const open = [node];
    const circuit = [];
    while (open.length > 0) {
      const current = open.pop()!;
      if (visited.has(current)) continue;
      visited.add(current);
      circuit.push(current);
      open.push(...current.neighbors);
    }
    if (circuit.length > 0) circuits.push(circuit);
  }

  const [a, b, c] = circuits.map((circuit) => circuit.length).sort((a, b) => b - a);
  return a * b * c;
}
