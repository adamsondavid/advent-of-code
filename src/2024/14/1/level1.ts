import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream, width: number, height: number) {
  const robots = input
    .readLines()
    .map((line) => line.match(/-?\d+/g)!.map(Number))
    .map((robot) => {
      return { x: robot[0], y: robot[1], dX: robot[2], dY: robot[3] };
    });

  for (const robot of robots) {
    robot.x = (((robot.x + 100 * robot.dX) % width) + width) % width;
    robot.y = (((robot.y + 100 * robot.dY) % height) + height) % height;
  }

  const topLeft = robots.filter((robot) => robot.x < (width - 1) / 2 && robot.y < (height - 1) / 2);
  const topRight = robots.filter((robot) => robot.x > (width - 1) / 2 && robot.y < (height - 1) / 2);
  const bottomLeft = robots.filter((robot) => robot.x < (width - 1) / 2 && robot.y > (height - 1) / 2);
  const bottomRight = robots.filter((robot) => robot.x > (width - 1) / 2 && robot.y > (height - 1) / 2);

  return topLeft.length * topRight.length * bottomLeft.length * bottomRight.length;
}
