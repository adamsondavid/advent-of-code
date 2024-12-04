import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const list = input.readLines().map((line) => line.split("   ").map(Number));
  const list1 = list.map((e) => e[0]);
  const list2 = list.map((e) => e[1]);

  const occurrences = list2.reduce(
    (occurrences, e) => occurrences.set(e, (occurrences.get(e) ?? 0) + 1),
    new Map<number, number>(),
  );
  return list1.reduce((sum, e) => sum + e * (occurrences.get(e) ?? 0), 0);
}
