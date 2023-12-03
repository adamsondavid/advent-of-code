import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    let start = "";
    let destination = "";
    const vertecies = new Map<string, number>();

    for (const [y, line] of this.input.readLines().entries()) {
      for (const [x, field] of line.split("").entries()) {
        const coordinate = JSON.stringify({ x, y });
        if (field === "S") start = coordinate;
        else if (field === "E") destination = coordinate;
        const height = field.replace("S", "a").replace("E", "z").codePointAt(0)! - "a".codePointAt(0)!;
        vertecies.set(coordinate, height);
      }
    }

    const queue = [[start]];
    const visited: string[] = [];

    while (queue.length) {
      const path = queue.shift()!;
      const vertex = path.at(-1)!;
      if (visited.includes(vertex)) continue;
      visited.push(vertex);
      if (vertex === destination) return path.length - 1;
      else {
        const { x, y } = JSON.parse(vertex);
        const height = vertecies.get(vertex)!;
        queue.push(
          ...[
            { x: x, y: y + 1 },
            { x: x + 1, y: y },
            { x: x, y: y - 1 },
            { x: x - 1, y: y },
          ]
            .map((coordinate) => JSON.stringify(coordinate))
            .filter((coordinate) => vertecies.get(coordinate)! <= height + 1)
            .map((coordinate) => [...path, coordinate]),
        );
      }
    }

    throw new Error("no path found");
  }
}
