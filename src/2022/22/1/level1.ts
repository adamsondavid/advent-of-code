import Level from "../../../utils/level";
import StringStream from "../../../utils/string-stream";

type Vec2 = {
  x: number;
  y: number;
};

type Player = {
  position: Vec2;
  direction: Vec2;
};

function mod(number: number, mod: number): number {
  return ((number % mod) + mod) % mod;
}

export default class extends Level {
  private readonly edgeLength;

  public constructor(input: StringStream, edgeLength: number) {
    super(input);
    this.edgeLength = edgeLength;
  }
  public run() {
    const directions = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
    ];

    const input = this.input.readLines().join("\n").split("\n\n");
    const field = input[0].split("\n").map((line) => line.split("").map((row) => (row === " " ? "" : row)));
    const instructions = input[1].match(/[a-zA-Z]+|[0-9]+/g)!;

    const player: Player = {
      position: { x: field[0].indexOf("."), y: 0 },
      direction: directions[0],
    };

    for (const instruction of instructions) {
      if (instruction === "R")
        player.direction = directions[mod(directions.indexOf(player.direction) + 1, directions.length)];
      else if (instruction === "L")
        player.direction = directions[mod(directions.indexOf(player.direction) - 1, directions.length)];
      else {
        let moves = parseInt(instruction);
        while (moves--) {
          const destination: Vec2 = {
            x: player.position.x + player.direction.x,
            y: player.position.y + player.direction.y,
          };
          if (!field[destination.y]?.[destination.x]) {
            destination.x = player.position.x;
            destination.y = player.position.y;
            const searchDirection = directions[mod(directions.indexOf(player.direction) + 2, directions.length)];
            while (true) {
              if (!field[destination.y + searchDirection.y]?.[destination.x + searchDirection.x]) break;
              destination.x += searchDirection.x;
              destination.y += searchDirection.y;
            }
          }
          if (field[destination.y][destination.x] === ".") {
            player.position.x = destination.x;
            player.position.y = destination.y;
          }
        }
      }
    }

    return 1000 * (player.position.y + 1) + 4 * (player.position.x + 1) + directions.indexOf(player.direction);
  }
}
