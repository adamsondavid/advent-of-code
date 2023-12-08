import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const _instructions = input.readLine()!.split("");
  input.readLine();
  const nodes = Object.fromEntries(
    input
      .readLines()
      .map((line) => line.match(/[1-9A-Z]{3}/g)!)
      .map(([start, L, R]) => [start, { L, R }]),
  );

  const currentNodes = Object.keys(nodes)
    .filter((node) => node.endsWith("A"))
    .map((node) => ({ start: node, end: node, steps: 0 }));

  for (const node of currentNodes) {
    const instructions = [..._instructions];
    while (!node.end.endsWith("Z")) {
      const instruction = instructions.shift()! as "L" | "R";
      instructions.push(instruction);
      node.end = nodes[node.end][instruction];
      node.steps++;
    }
  }

  return {
    nodes: currentNodes,
    // Just pass the solution (resulting expression) into wolfram alpha or similar
    solution: `lcm(${currentNodes.map((node) => node.steps).join()})`,
  };
}
