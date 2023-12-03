import Level from "../../../utils/level";
import Graph from "node-dijkstra";

type Vec2 = { readonly x: number; readonly y: number };

const UP: Vec2 = { x: 0, y: -1 };
const RIGHT: Vec2 = { x: 1, y: 0 };
const DOWN: Vec2 = { x: 0, y: 1 };
const LEFT: Vec2 = { x: -1, y: 0 };
const directions: Vec2[] = [UP, RIGHT, DOWN, LEFT];

export default class extends Level {
  public run() {
    let map = this.input.readLines().map((row) => row.split("").map((weight) => parseInt(weight)));

    function expandX(inputMap: number[][]): number[][] {
      const increase = (x: number) => (x == 9 ? 1 : x + 1);
      const res: number[][] = [];
      for (const r of inputMap) {
        const x2 = r.map(increase);
        const x3 = x2.map(increase);
        const x4 = x3.map(increase);
        const x5 = x4.map(increase);
        res.push([...r, ...x2, ...x3, ...x4, ...x5]);
      }
      return res;
    }

    function expandY(inputMap: number[][]): number[][] {
      const increase = (x: number) => (x == 9 ? 1 : x + 1);
      const res: number[][] = [];
      res.push(...inputMap);
      let c: number[][] = [];
      c.push(...inputMap);
      for (let x = 1; x < 5; x++) {
        c = c.map((x: number[]) => x.map((n: number) => increase(n)));
        res.push(...c);
      }
      return res;
    }

    map = expandY(expandX(map));

    const graph = new Map<string, Map<string, number>>();
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        const connections = new Map<string, number>(
          directions
            .map((direction) => ({ x: x + direction.x, y: y + direction.y }))
            .filter((direction) => map[direction.y]?.[direction.x])
            .map((direction) => [JSON.stringify(direction), map[direction.y][direction.x]]),
        );
        graph.set(JSON.stringify({ x, y }), connections);
      }
    }

    const route = new Graph(graph);

    return route.path(JSON.stringify({ x: 0, y: 0 }), JSON.stringify({ x: map[0].length - 1, y: map.length - 1 }), {
      cost: true,
    }).cost;
  }
}
