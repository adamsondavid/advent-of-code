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

export function solve(input: StringStream) {
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
    .sort((a, b) => b.distance - a.distance);

  function getCircuits() {
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
    return circuits;
  }

  let res = 0;
  while (getCircuits().length !== 1) {
    const dist = distances.pop()!;
    dist.a.neighbors.push(dist.b);
    dist.b.neighbors.push(dist.a);
    res = dist.a.position.x * dist.b.position.x;
  }
  return res;
}
