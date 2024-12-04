import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const numbers = this.input.readLines().map((line) => ({ value: parseInt(line) }));
    const mixedNumbers = [...numbers];

    for (const number of numbers) {
      const index = mixedNumbers.indexOf(number);
      mixedNumbers.splice(index, 1);
      mixedNumbers.splice((index + number.value) % mixedNumbers.length, 0, number);
    }

    const indexOfZero = mixedNumbers.findIndex((number) => number.value === 0);
    return [1000, 2000, 3000]
      .map((index) => mixedNumbers[(indexOfZero + index) % mixedNumbers.length])
      .reduce((a, b) => a + b.value, 0);
  }
}
