import StringStream from "../../../utils/string-stream";

const activeBatteries = 12;

export function solve(input: StringStream) {
  let res = 0;

  for (const bank of input.readLines()) {
    const batteries = bank.split("").map(Number);

    const joltage = new Array<number>();
    while (joltage.length < activeBatteries) {
      const largestBattery = Math.max(...batteries.slice(0, batteries.length - (activeBatteries - joltage.length - 1)));
      joltage.push(largestBattery);
      batteries.splice(0, batteries.indexOf(largestBattery) + 1);
    }

    res += Number(joltage.join(""));
  }

  return res;
}
