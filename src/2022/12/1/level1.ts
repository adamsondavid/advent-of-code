import Level from "../../../utils/level";
import Graph from "node-dijkstra";

function nodeName(x: number, y: number, height: number) {
  return `${x} ${y} ${height}`;
}

export default class extends Level {
  public run() {
    let start, destination;
    const map = this.input.readLines().map((line, y) =>
      line.split("").map((c, x) => {
        let height = c.codePointAt(0)! - "a".codePointAt(0)!;
        if (c === "S") {
          height = 0;
          start = nodeName(x, y, height);
        }
        if (c === "E") {
          height = "z".codePointAt(0)! - "a".codePointAt(0)!;
          destination = nodeName(x, y, height);
        }
        return height;
      }),
    );

    const graph = new Graph();
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const height = map[y][x];
        const neighbours: any = {};
        if (map[y - 1]?.[x] <= height + 1) neighbours[nodeName(x, y - 1, map[y - 1]?.[x])] = 1;
        if (map[y]?.[x + 1] <= height + 1) neighbours[nodeName(x + 1, y, map[y]?.[x + 1])] = 1;
        if (map[y + 1]?.[x] <= height + 1) neighbours[nodeName(x, y + 1, map[y + 1]?.[x])] = 1;
        if (map[y]?.[x - 1] <= height + 1) neighbours[nodeName(x - 1, y, map[y]?.[x - 1])] = 1;
        graph.addNode(nodeName(x, y, height), neighbours);
      }
    }

    const path = graph.path(start, destination);
    return Array.isArray(path) ? path.length - 1 : Infinity;
  }
}
