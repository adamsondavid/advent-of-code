import Level from "../../../utils/level";

type Node = {
  readonly name: string;
  readonly neighbours: Node[];
};

export default class extends Level {
  public run() {
    const input = this.input.readLines();

    const nodes: Node[] = [...new Set(input.flatMap((line) => line.split("-")))].map((name) => ({
      name,
      neighbours: [],
    }));

    for (const connection of input) {
      const [a, b] = connection.split("-");
      const aNode = nodes.find((node) => node.name === a)!;
      const bNode = nodes.find((node) => node.name === b)!;
      aNode.neighbours.push(bNode);
      bNode.neighbours.push(aNode);
    }

    const validPaths = new Array<Node[]>();
    const queue = [{ steps: [nodes.find((node) => node.name === "start")!], visited: new Set<Node>() }];

    while (queue.length) {
      const path = queue.shift()!;
      const current = path.steps.at(-1)!;
      if (current.name === "end") {
        validPaths.push(path.steps);
        continue;
      }
      const visited = new Set(path.visited);
      if (current.name === current.name.toLowerCase()) visited.add(current);
      for (const neighbour of current.neighbours)
        if (!visited.has(neighbour)) queue.push({ steps: [...path.steps, neighbour], visited });
    }

    return validPaths.length;
  }
}
