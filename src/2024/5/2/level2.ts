import StringStream from "../../../utils/string-stream";

export function solve(_input: StringStream) {
  const input = _input.readLines().join("\n").split("\n\n");
  const pageOrderingRules = input[0]
    .split("\n")
    .map((line) => line.split("|"))
    .reduce((pageOrderingRules, rule) => {
      if (!pageOrderingRules.has(rule[0])) pageOrderingRules.set(rule[0], []);
      pageOrderingRules.get(rule[0])!.push(rule[1]);
      return pageOrderingRules;
    }, new Map<string, string[]>());
  const pages = input[1].split("\n").map((line) => line.split(","));

  function isPageSorted(report: string[]) {
    for (let i = 0; i < report.length; i++) {
      const num = report[i];
      for (const following of report.slice(i + 1)) {
        if (!pageOrderingRules.get(num)?.includes(following)) return false;
      }
    }
    return true;
  }

  function sort(graph: Map<string, string[]>) {
    const inDegree = new Map();
    const queue = new Array<string>();

    for (const node of graph.keys()) inDegree.set(node, 0);
    for (const node of graph.keys())
      for (const neighbor of graph.get(node)!) inDegree.set(neighbor, (inDegree.get(neighbor) ?? 0) + 1);
    for (const [node, degree] of inDegree.entries()) if (degree === 0) queue.push(node);

    const result = new Array<string>();
    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);

      for (const neighbor of graph.get(current)!.filter((neighbor) => graph.has(neighbor))) {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        if (inDegree.get(neighbor) === 0) queue.push(neighbor);
      }
    }

    return result.filter((num) => graph.has(num));
  }

  let res = 0;
  for (const page of pages) {
    if (!isPageSorted(page)) {
      const sortedPage = sort(new Map([...pageOrderingRules.entries()].filter(([key]) => page.includes(key))));
      res += Number(sortedPage[Math.floor(sortedPage.length / 2)]);
    }
  }
  return res;
}
