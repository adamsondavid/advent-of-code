import Level from "../../../utils/level";

function findFirstDigit(arr: string[]) {
  for (let i = 0; i < arr.length; i++) if (!isNaN(parseInt(arr[i]))) return arr[i];
  throw new Error("expected to find digit in string");
}

export default class extends Level {
  public run() {
    return this.input
      .readLines()
      .map((line) => line.split(""))
      .map((line) => findFirstDigit(line) + findFirstDigit(line.reverse()))
      .map((number) => parseInt(number))
      .reduce((a, b) => a + b, 0);
  }
}
