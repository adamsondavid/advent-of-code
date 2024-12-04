import Level from "../../../utils/level";

interface Vec2 {
  x: number;
  y: number;
}

interface Rock {
  collider: string[][];
  position: Vec2;
}

const colliders = [
  [["#", "#", "#", "#"]],
  [
    [".", "#", "."],
    ["#", "#", "#"],
    [".", "#", "."],
  ],
  [
    ["#", "#", "#"],
    [".", ".", "#"],
    [".", ".", "#"],
  ],
  [["#"], ["#"], ["#"], ["#"]],
  [
    ["#", "#"],
    ["#", "#"],
  ],
];

function height(grid: string[][]) {
  for (let y = grid.length; y >= -1; y--) {
    if (grid[y] && (grid[y].includes("#") || grid[y].includes("-"))) return y + 1;
  }
  return 0;
}

export default class extends Level {
  public run() {
    const input = this.input.readLine()!.split("");
    const grid = [];
    grid[-1] = ["+", "-", "-", "-", "-", "-", "-", "-", "+"];

    for (let i = 0; i < 2022; i++) {
      const rock: Rock = { position: { x: 2, y: height(grid) + 3 }, collider: colliders[i % colliders.length] };
      rock: while (true) {
        const xMove = input.shift()!;
        input.push(xMove);

        const xDir = xMove === ">" ? 1 : -1;
        let move = true;
        for (let h = 0; h < rock.collider.length; h++) {
          if (!grid[h + rock.position.y]) grid[h + rock.position.y] = ["|", ".", ".", ".", ".", ".", ".", ".", "|"];
          for (let w = 0; w < rock.collider[h].length; w++) {
            const f = grid[h + rock.position.y][w + rock.position.x + 1 + xDir];
            const r = rock.collider[h][w];
            if (f !== "." && r !== ".") move = false;
          }
        }
        if (move) rock.position.x += xDir;

        for (let h = 0; h < rock.collider.length; h++) {
          if (!grid[h + rock.position.y - 1])
            grid[h + rock.position.y - 1] = ["|", ".", ".", ".", ".", ".", ".", ".", "|"];
          for (let w = 0; w < rock.collider[h].length; w++) {
            const f = grid[h + rock.position.y - 1][w + rock.position.x + 1];
            const r = rock.collider[h][w];

            if (f !== "." && r !== ".") {
              for (let h2 = 0; h2 < rock.collider.length; h2++) {
                if (!grid[h2 + rock.position.y])
                  grid[h2 + rock.position.y] = ["|", ".", ".", ".", ".", ".", ".", ".", "|"];
                for (let w2 = 0; w2 < rock.collider[h2].length; w2++) {
                  if (rock.collider[h2][w2] === "#") grid[h2 + rock.position.y][w2 + rock.position.x + 1] = "#";
                }
              }
              break rock;
            }
          }
        }
        rock.position.y--;
      }
    }

    return height(grid);
  }
}
