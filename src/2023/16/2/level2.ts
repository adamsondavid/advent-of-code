import StringStream from "../../../utils/string-stream";

const dirs = {
  top: { y: -1, x: 0 },
  right: { y: 0, x: 1 },
  bottom: { y: 1, x: 0 },
  left: { y: 0, x: -1 },
};

function heated(map: string[][], start: { pos: { x: number; y: number }; dir: { x: number; y: number } }) {
  const heated = new Set<string>();
  const beams = [start];
  const closedList = new Set<string>();
  while (beams.length) {
    const current = beams.pop()!;
    const symbol = map[current.pos.y]?.[current.pos.x];
    if (!symbol) continue;
    if (closedList.has(JSON.stringify(current))) continue;
    heated.add(JSON.stringify(current.pos));
    closedList.add(JSON.stringify(current));
    if (
      symbol === "." ||
      (symbol === "|" && [dirs.top, dirs.bottom].includes(current.dir)) ||
      (symbol === "-" && [dirs.right, dirs.left].includes(current.dir))
    ) {
      beams.push({ pos: { x: current.pos.x + current.dir.x, y: current.pos.y + current.dir.y }, dir: current.dir });
    } else if (symbol === "|" && [dirs.right, dirs.left].includes(current.dir)) {
      beams.push({ pos: { x: current.pos.x + dirs.top.x, y: current.pos.y + dirs.top.y }, dir: dirs.top });
      beams.push({ pos: { x: current.pos.x + dirs.bottom.x, y: current.pos.y + dirs.bottom.y }, dir: dirs.bottom });
    } else if (symbol === "-" && [dirs.top, dirs.bottom].includes(current.dir)) {
      beams.push({ pos: { x: current.pos.x + dirs.left.x, y: current.pos.y + dirs.left.y }, dir: dirs.left });
      beams.push({ pos: { x: current.pos.x + dirs.right.x, y: current.pos.y + dirs.right.y }, dir: dirs.right });
    } else if (symbol === "/" && current.dir === dirs.top) {
      beams.push({ pos: { x: current.pos.x + dirs.right.x, y: current.pos.y + dirs.right.y }, dir: dirs.right });
    } else if (symbol === "/" && current.dir === dirs.bottom) {
      beams.push({ pos: { x: current.pos.x + dirs.left.x, y: current.pos.y + dirs.left.y }, dir: dirs.left });
    } else if (symbol === "/" && current.dir === dirs.right) {
      beams.push({ pos: { x: current.pos.x + dirs.top.x, y: current.pos.y + dirs.top.y }, dir: dirs.top });
    } else if (symbol === "/" && current.dir === dirs.left) {
      beams.push({ pos: { x: current.pos.x + dirs.bottom.x, y: current.pos.y + dirs.bottom.y }, dir: dirs.bottom });
    } else if (symbol === "\\" && current.dir === dirs.top) {
      beams.push({ pos: { x: current.pos.x + dirs.left.x, y: current.pos.y + dirs.left.y }, dir: dirs.left });
    } else if (symbol === "\\" && current.dir === dirs.bottom) {
      beams.push({ pos: { x: current.pos.x + dirs.right.x, y: current.pos.y + dirs.right.y }, dir: dirs.right });
    } else if (symbol === "\\" && current.dir === dirs.right) {
      beams.push({ pos: { x: current.pos.x + dirs.bottom.x, y: current.pos.y + dirs.bottom.y }, dir: dirs.bottom });
    } else if (symbol === "\\" && current.dir === dirs.left) {
      beams.push({ pos: { x: current.pos.x + dirs.top.x, y: current.pos.y + dirs.top.y }, dir: dirs.top });
    }
  }
  return heated.size;
}

export function solve(input: StringStream) {
  const map = input.readLines().map((line) => line.split(""));

  const res = new Array<number>();
  for (let y = 0; y < map.length; y++) {
    res.push(heated(map, { pos: { x: 0, y }, dir: dirs.right }));
    res.push(heated(map, { pos: { x: map[y].length - 1, y }, dir: dirs.left }));
  }
  for (let x = 0; x < map[0].length; x++) {
    res.push(heated(map, { pos: { x, y: 0 }, dir: dirs.bottom }));
    res.push(heated(map, { pos: { x, y: map.length - 1 }, dir: dirs.top }));
  }

  return Math.max(...res);
}
