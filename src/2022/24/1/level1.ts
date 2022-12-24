import Level from "../../../utils/level";

type Vec2 = {
  x: number;
  y: number;
};

type Blizzard = {
  readonly position: Vec2;
  readonly direction: Vec2;
};

const UP: Vec2 = { x: 0, y: -1 };
const DOWN: Vec2 = { x: 0, y: 1 };
const LEFT: Vec2 = { x: -1, y: 0 };
const RIGHT: Vec2 = { x: 1, y: 0 };

export default class extends Level {
  public run() {
    const field: string[][] = [];
    const blizzards: Blizzard[] = [];

    for (const [y, line] of this.input.readLines().entries()) {
      for (const [x, char] of line.split("").entries()) {
        if (char === "^") blizzards.push({ position: { x, y }, direction: UP });
        if (char === "v") blizzards.push({ position: { x, y }, direction: DOWN });
        if (char === "<") blizzards.push({ position: { x, y }, direction: LEFT });
        if (char === ">") blizzards.push({ position: { x, y }, direction: RIGHT });
      }
      field.push(line.replace(/[\^v<>]/, ".").split(""));
    }

    const exit: Vec2 = { x: field[field.length - 1].indexOf("."), y: field.length - 1 };
    const player: Vec2 = { x: field[0].indexOf("."), y: 0 };

    let min = 0;
    let players = [player];

    while (true) {
      min++;

      for (const blizzard of blizzards) {
        blizzard.position.x += blizzard.direction.x;
        blizzard.position.y += blizzard.direction.y;
        if ((field[blizzard.position.y]?.[blizzard.position.x] ?? "#") === "#") {
          if (blizzard.direction === UP) blizzard.position.y = field.length - 2;
          if (blizzard.direction === DOWN) blizzard.position.y = 1;
          if (blizzard.direction === LEFT) blizzard.position.x = field[blizzard.position.y].length - 2;
          if (blizzard.direction === RIGHT) blizzard.position.x = 1;
        }
      }

      const newPlayers = new Set<string>();
      for (const player of players) {
        for (const direction of [{ x: 0, y: 0 }, UP, DOWN, LEFT, RIGHT]) {
          const newPlayer = { x: player.x + direction.x, y: player.y + direction.y };
          if ((field[newPlayer.y]?.[newPlayer.x] ?? "#") === "#") continue;
          if (blizzards.some((blizzard) => blizzard.position.x === newPlayer.x && blizzard.position.y === newPlayer.y))
            continue;
          if (newPlayer.x === exit.x && newPlayer.y === exit.y) return min;
          newPlayers.add(JSON.stringify(newPlayer));
        }
      }
      players = Array.from(newPlayers.values()).map((player) => JSON.parse(player));
    }
  }
}
