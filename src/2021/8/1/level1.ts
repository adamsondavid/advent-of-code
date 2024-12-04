import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const digits = this.input.readLines().flatMap((line) => line.split(" | ")[1].split(" "));
    const uniqueDigits = digits.filter((digit) => [2, 3, 4, 7].includes(digit.length));
    return uniqueDigits.length;
  }
}
