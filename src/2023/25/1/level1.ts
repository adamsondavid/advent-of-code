import StringStream from "../../../utils/string-stream";
import Graph from "node-dijkstra";

function secondMostFrequentlyVisitedNode(nodes: string[]) {
  const count = nodes.reduce((count, node) => count.set(node, (count.get(node) ?? 0) + 1), new Map<string, number>());
  return [...count.entries()].sort((a, b) => b[1] - a[1])[1][0];
}

export function solve(input: StringStream) {
  const graph = input
    .readLines()
    .flatMap((line) => {
      const [start, ...end] = line.match(/[a-z]+/g)!;
      return end.map((end) => [start, end]);
    })
    .reduce((graph, connection) => {
      if (!graph.has(connection[0])) graph.set(connection[0], new Map());
      if (!graph.has(connection[1])) graph.set(connection[1], new Map());
      graph.get(connection[0])!.set(connection[1], 1);
      graph.get(connection[1])!.set(connection[0], 1);
      return graph;
    }, new Map<string, Map<string, number>>());
  const nodes = [...graph.keys()];

  for (let i = 0; i < 3; i++) {
    const g = new Graph(graph);
    const visited = new Set<string>();
    let current = nodes[0];
    while (!visited.has(current)) {
      visited.add(current);
      current = secondMostFrequentlyVisitedNode(
        nodes.filter((node) => node != current).flatMap((node) => g.path(current, node) as string[]),
      );
    }
    const [a, b] = [...visited].slice(-2);
    graph.get(a)!.delete(b);
    graph.get(b)!.delete(a);
  }

  const reachableNodes = new Set<string>();
  const open = [nodes[0]];
  while (open.length) {
    const current = open.shift()!;
    if (reachableNodes.has(current)) continue;
    reachableNodes.add(current);
    for (const neighbour of graph.get(current)!.keys()) open.push(neighbour);
  }
  return (nodes.length - reachableNodes.size) * reachableNodes.size;
}
