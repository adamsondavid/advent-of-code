import Level from "../../../utils/level";

function parseSnafu(snafu: string): number {
  return snafu
    .split("")
    .map((digit) => (digit === "-" ? -1 : digit === "=" ? -2 : parseInt(digit)))
    .reverse()
    .reduce((a, b, i) => a + b * Math.pow(5, i), 0);
}

function toSnafu(number: number): string {
  const digits: number[] = [];
  while (number > 0) {
    digits.push(number % 5);
    number = Math.floor(number / 5);
  }
  digits.reverse();
  while (digits.find((element) => element >= 3)) {
    for (let i = 0; i < digits.length; i++) {
      if (digits[i] >= 3) {
        digits[i] -= 5;
        digits[i - 1] += 1;
      }
    }
  }
  return digits.map((digit) => (digit === -1 ? "-" : digit === -2 ? "=" : digit.toString())).join("");
}

export default class extends Level {
  public run() {
    const snafus = this.input.readLines().map((snafu) => parseSnafu(snafu));
    const sum = snafus.reduce((a, b) => a + b, 0);
    return toSnafu(sum);
  }
}
