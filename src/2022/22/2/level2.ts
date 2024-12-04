import Level from "../../../utils/level";

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
  public run() {
    const RIGHT: Vec2 = { x: 1, y: 0 };
    const DOWN: Vec2 = { x: 0, y: 1 };
    const LEFT: Vec2 = { x: -1, y: 0 };
    const UP: Vec2 = { x: 0, y: -1 };
    const directions = [RIGHT, DOWN, LEFT, UP];

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
          let destinationRotation;
          if (!field[destination.y]?.[destination.x]) {
            const xFace = Math.floor(player.position.x / 50);
            const yFace = Math.floor(player.position.y / 50);

            if (xFace === 1 && yFace === 0) {
              if (player.direction === LEFT) {
                destination.x = 0;
                destination.y = 149 - player.position.y;
                destinationRotation = RIGHT;
              }
              if (player.direction === UP) {
                destination.x = 0;
                destination.y = 150 + (player.position.x - 50);
                destinationRotation = RIGHT;
              }
            }
            if (xFace === 2 && yFace === 0) {
              if (player.direction === RIGHT) {
                destination.x = 99;
                destination.y = 149 - player.position.y;
                destinationRotation = LEFT;
              }
              if (player.direction === DOWN) {
                destination.x = 99;
                destination.y = 50 + (player.position.x - 100);
                destinationRotation = LEFT;
              }
              if (player.direction === UP) {
                destination.x = player.position.x - 100;
                destination.y = 199;
                destinationRotation = UP;
              }
            }
            if (xFace === 1 && yFace === 1) {
              if (player.direction === RIGHT) {
                destination.x = 100 + (player.position.y - 50);
                destination.y = 49;
                destinationRotation = UP;
              }
              if (player.direction === LEFT) {
                destination.x = player.position.y - 50;
                destination.y = 100;
                destinationRotation = DOWN;
              }
            }
            if (xFace === 0 && yFace === 2) {
              if (player.direction === LEFT) {
                destination.x = 50;
                destination.y = 49 - (player.position.y - 100);
                destinationRotation = RIGHT;
              }
              if (player.direction === UP) {
                destination.x = 50;
                destination.y = 50 + player.position.x;
                destinationRotation = RIGHT;
              }
            }
            if (xFace === 1 && yFace === 2) {
              if (player.direction === RIGHT) {
                destination.x = 149;
                destination.y = 49 - (player.position.y - 100);
                destinationRotation = LEFT;
              }
              if (player.direction === DOWN) {
                destination.x = 49;
                destination.y = 150 + (player.position.x - 50);
                destinationRotation = LEFT;
              }
            }
            if (xFace === 0 && yFace === 3) {
              if (player.direction === RIGHT) {
                destination.x = 50 + (player.position.y - 150);
                destination.y = 149;
                destinationRotation = UP;
              }
              if (player.direction === DOWN) {
                destination.x = 100 + player.position.x;
                destination.y = 0;
                destinationRotation = DOWN;
              }
              if (player.direction === LEFT) {
                destination.x = 50 + (player.position.y - 150);
                destination.y = 0;
                destinationRotation = DOWN;
              }
            }
          }
          if (field[destination.y][destination.x] === ".") {
            player.position.x = destination.x;
            player.position.y = destination.y;
            if (destinationRotation) player.direction = destinationRotation;
          }
        }
      }
    }

    return 1000 * (player.position.y + 1) + 4 * (player.position.x + 1) + directions.indexOf(player.direction);
  }
}
