import StringStream from "../../../utils/string-stream";

function equals(a: string[], b: string[]) {
  return a.every((element, i) => !a || !b || !element || !b[i] || element === b[i]);
}

export function solve(input: StringStream) {
  const maps = input
    .readLines()
    .join("\n")
    .split("\n\n")
    .map((row) => row.split(""))
    .map((map) => {
      const newMaps = [
        map
          .join("")
          .split("\n")
          .map((row) => row.split("")),
      ];
      for (let i = 0; i < map.length; i++) {
        const m = [...map];
        if (map[i] === "\n") continue;
        if (map[i] === ".") {
          m[i] = "#";
          newMaps.push(
            m
              .join("")
              .split("\n")
              .map((row) => row.split("")),
          );
        }
        if (map[i] === "#") {
          m[i] = ".";
          newMaps.push(
            m
              .join("")
              .split("\n")
              .map((row) => row.split("")),
          );
        }
      }
      return newMaps;
    });

  const _mirrors = new Array<{ x: number } | { y: number }>();
  for (const _map of maps) {
    const mirrors = new Array<{ x: number } | { y: number }>();
    for (const map of _map) {
      for (let Y = 0; Y < map.length - 1; Y++) {
        let mirror = true;
        for (let y = 0; y <= Y; y++) {
          const a = map[y];
          const b = map[Y + Y + 1 - y];
          if (!equals(a, b)) {
            mirror = false;
            break;
          }
        }
        if (mirror) {
          mirrors.push({ y: Y });
        }
      }

      for (let X = 0; X < map[0].length - 1; X++) {
        let mirror = true;
        for (let x = 0; x <= X; x++) {
          const a = map.map((row) => row[x]);
          const b = map.map((row) => row[X + X + 1 - x]);
          if (!equals(a, b)) {
            mirror = false;
            break;
          }
        }
        if (mirror) mirrors.push({ x: X });
      }
    }
    const m = mirrors.find((m) => JSON.stringify(mirrors[0]) !== JSON.stringify(m))!;
    _mirrors.push(m);
  }

  return _mirrors
    .map((mirror) => {
      if ("x" in mirror) return mirror.x + 1;
      else return (mirror.y + 1) * 100;
    })
    .reduce((sum, mirror) => sum + mirror);
}
