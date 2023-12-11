import StringStream from "../../../utils/string-stream";

type Vec2 = { x: number; y: number };
type Galaxy = { position: Vec2; offset: Vec2 };

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  const galaxies = new Array<Galaxy>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") galaxies.push({ position: { x, y }, offset: { x: 0, y: 0 } });
    }
  }

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    if (row.every((item) => item === "."))
      galaxies.filter((galaxy) => galaxy.position.y > y).forEach((galaxy) => (galaxy.offset.y += 1000000 - 1));
  }

  for (let x = 0; x < map[0].length; x++) {
    const col = map.map((row) => row[x]);
    if (col.every((item) => item === "."))
      galaxies.filter((galaxy) => galaxy.position.x > x).forEach((galaxy) => (galaxy.offset.x += 1000000 - 1));
  }

  let ans = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const a = { x: galaxies[i].position.x + galaxies[i].offset.x, y: galaxies[i].position.y + galaxies[i].offset.y };
      const b = { x: galaxies[j].position.x + galaxies[j].offset.x, y: galaxies[j].position.y + galaxies[j].offset.y };
      const dist = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
      ans += dist;
    }
  }

  return ans;
}
