import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream, width: number, height: number) {
  const robots = input
    .readLines()
    .map((line) => line.match(/-?\d+/g)!.map(Number))
    .map((robot) => {
      return { x: robot[0], y: robot[1], dX: robot[2], dY: robot[3] };
    });

  function render(frame: number) {
    const map = new Array(height).fill(0).map(() => new Array(height).fill("."));
    for (const robot of robots) {
      const x = (((robot.x + frame * robot.dX) % width) + width) % width;
      const y = (((robot.y + frame * robot.dY) % height) + height) % height;
      map[y][x] = "X";
    }
    return map;
  }

  for (let i = 0; true; i++) {
    const map = render(i);
    if (map.some((line) => line.join("").includes("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"))) {
      console.log(map.map((line) => line.join("")).join("\n"));
      return i;
    }
  }
}
