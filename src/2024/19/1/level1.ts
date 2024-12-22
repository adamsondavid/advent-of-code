import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const towels = new Set(input.readLine()!.split(", "));
  input.readLine()!;
  const designs = input.readLines();

  return designs
    .map((design) => {
      const queue = [design];
      const closed = new Set<string>();
      while (queue.length) {
        const current = queue.shift()!;
        if (closed.has(current)) continue;
        closed.add(current);
        if (towels.has(current)) return { design, isPossible: true };
        for (let i = 1; i < current.length; i++) {
          const sub = current.substring(0, i);
          if (towels.has(sub)) {
            queue.push(current.substring(i));
          }
        }
      }
      return { design, isPossible: false };
    })
    .filter((design) => design.isPossible).length;
}
