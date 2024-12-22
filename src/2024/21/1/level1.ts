import StringStream from "../../../utils/string-stream";
import Heap from "heap-js";

function find(keypad: string[][], symbol: string) {
  for (let y = 0; y < keypad.length; y++) {
    for (let x = 0; x < keypad[y].length; x++) {
      if (keypad[y][x] === symbol) return { x, y };
    }
  }
  throw new Error("symbol not on map");
}

function calcMovements(keypad: string[][], start: string, end: string) {
  const queue = Heap.heapify(
    [{ pos: find(keypad, start), path: new Array<string>(), cost: 0 }],
    (a, b) => a.cost - b.cost,
  );
  const visited = new Set<string>();
  while (queue.length) {
    const current = queue.pop()!;
    if (keypad[current.pos.y]?.[current.pos.x] === " ") continue;
    if (visited.has(JSON.stringify(current))) continue;
    visited.add(JSON.stringify(current));

    if (keypad[current.pos.y]?.[current.pos.x] === end) return current.path.join("") + "A";

    queue.push({
      pos: { x: current.pos.x + 1, y: current.pos.y },
      path: [...current.path, ">"],
      cost: current.path.at(-1) === ">" ? current.cost + 1 : current.cost + 4,
    });
    queue.push({
      pos: { x: current.pos.x, y: current.pos.y + 1 },
      path: [...current.path, "v"],
      cost: current.path.at(-1) === "v" ? current.cost + 1 : current.cost + 4,
    });
    queue.push({
      pos: { x: current.pos.x - 1, y: current.pos.y },
      path: [...current.path, "<"],
      cost: current.path.at(-1) === "<" ? current.cost + 1 : current.cost + 4,
    });
    queue.push({
      pos: { x: current.pos.x, y: current.pos.y - 1 },
      path: [...current.path, "^"],
      cost: current.path.at(-1) === "^" ? current.cost + 1 : current.cost + 4,
    });
  }
  throw new Error("no connection found");
}

function calcMovementMap(keypad: string[][]) {
  const symbols = keypad.flat().filter((symbol) => symbol !== " ");
  const map: Record<string, Record<string, string>> = {};
  for (let i = 0; i < symbols.length; i++) {
    for (let j = 0; j < symbols.length; j++) {
      if (!map[symbols[i]]) map[symbols[i]] = {};
      map[symbols[i]][symbols[j]] = calcMovements(keypad, symbols[i], symbols[j]);
    }
  }
  return map;
}

function createKeypad(keypad: string[][]) {
  const map = calcMovementMap(keypad);
  return class {
    private pos = "A";
    process(input: string) {
      let res = "";
      for (const i of input) {
        res += map[this.pos][i];
        this.pos = i;
      }
      return res;
    }
  };
}

export function solve(input: StringStream) {
  const NumericKeypad = createKeypad([
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    [" ", "0", "A"],
  ]);
  const DirectionalKeypad = createKeypad([
    [" ", "^", "A"],
    ["<", "v", ">"],
  ]);

  let res = 0;
  for (const code of input.readLines()) {
    const keypad = new NumericKeypad();
    const b = new DirectionalKeypad();
    const a = new DirectionalKeypad();
    const moves = a.process(b.process(keypad.process(code)));
    res += moves.length * parseInt(code);
  }
  return res;
}
