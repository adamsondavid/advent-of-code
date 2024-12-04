import StringStream from "../../../utils/string-stream";

type Vec2 = { x: number; y: number };

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    if (row.every((item) => item === ".")) {
      map.splice(y, 0, [...row]);
      y++;
    }
  }

  for (let x = 0; x < map[0].length; x++) {
    const col = map.map((row) => row[x]);
    if (col.every((item) => item === ".")) {
      for (const row of map) row.splice(x, 0, ".");
      x++;
    }
  }

  const galaxies = new Array<Vec2>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") galaxies.push({ x, y });
    }
  }

  let ans = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const a = galaxies[i];
      const b = galaxies[j];
      const dist = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
      ans += dist;
    }
  }
  return ans;
}
