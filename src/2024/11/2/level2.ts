import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  let stones = input
    .readLine()!
    .match(/\d+/g)!
    .map(Number)
    .reduce((a, b) => a.set(b, (a.get(b) ?? 0) + 1), new Map<number, number>());

  for (let i = 0; i < 75; i++) {
    const entries = [...stones.entries()];
    for (const [stoneNumber, amount] of entries) {
      const stoneNumberString = stoneNumber.toString();
      stones.set(stoneNumber, (stones.get(stoneNumber) ?? 0) - amount);
      if (stoneNumber === 0) {
        stones.set(1, (stones.get(1) ?? 0) + amount);
      } else if (stoneNumberString.length % 2 === 0) {
        const a = Number(stoneNumberString.substring(0, stoneNumberString.length / 2));
        const b = Number(stoneNumberString.substring(stoneNumberString.length / 2));
        stones.set(a, (stones.get(a) ?? 0) + amount);
        stones.set(b, (stones.get(b) ?? 0) + amount);
      } else {
        stones.set(stoneNumber * 2024, (stones.get(stoneNumber * 2024) ?? 0) + amount);
      }
    }
  }
  return [...stones.values()].reduce((a, b) => a + b, 0);
}
