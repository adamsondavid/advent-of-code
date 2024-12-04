import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const list = input.readLines().map((line) => line.split("   ").map(Number));
  const list1 = list.map((e) => e[0]).sort();
  const list2 = list.map((e) => e[1]).sort();

  let res = 0;
  for (let i = 0; i < list1.length; i++) {
    res += Math.abs(Math.min(list1[i] - list2[i], list2[i] - list1[i]));
  }
  return res;
}
