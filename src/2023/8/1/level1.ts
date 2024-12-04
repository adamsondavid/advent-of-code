import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const instructions = input.readLine()!.split("") as Array<"L" | "R">;
  input.readLine();
  const nodes = Object.fromEntries(
    input
      .readLines()
      .map((line) => line.match(/[1-9A-Z]{3}/g)!)
      .map(([start, L, R]) => [start, { L, R }]),
  );

  let current = "AAA";
  let steps = 0;
  while (current !== "ZZZ") {
    const instruction = instructions.shift()!;
    instructions.push(instruction);
    current = nodes[current][instruction];
    steps++;
  }

  return steps;
}
