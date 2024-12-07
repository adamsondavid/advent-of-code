import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const lines = input.readLines().map((line) =>
    line
      .split(": ")
      .flatMap((k) => k.split(" "))
      .map(Number),
  );

  let res = 0;
  for (const line of lines) {
    const [testValue, ...values] = line;
    const queue = [{ i: 1, v: values[0] }];
    while (queue.length) {
      const q = queue.shift()!;
      if (q.i === values.length) {
        if (q.v === testValue) {
          res += testValue;
          break;
        }
        continue;
      }
      if (q.v > testValue) continue;
      queue.push({ i: q.i + 1, v: q.v + values[q.i] });
      queue.push({ i: q.i + 1, v: q.v * values[q.i] });
    }
  }
  return res;
}
