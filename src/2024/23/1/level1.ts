import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const connections = new Set(input.readLines());
  const _nodes = new Set<string>();
  for (const connection of connections) {
    const [a, b] = connection.split("-");
    connections.add(`${b}-${a}`);
    _nodes.add(a);
    _nodes.add(b);
  }
  const nodes = [..._nodes];

  let triples = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      for (let k = j + 1; k < nodes.length; k++) {
        triples.push([nodes[i], nodes[j], nodes[k]]);
      }
    }
  }

  triples = triples.filter((triple) => triple.find((node) => node.startsWith("t")));

  let res = 0;
  for (const triple of triples) {
    if (
      connections.has(`${triple[0]}-${triple[1]}`) &&
      connections.has(`${triple[1]}-${triple[2]}`) &&
      connections.has(`${triple[0]}-${triple[2]}`)
    ) {
      res++;
    }
  }
  return res;
}
