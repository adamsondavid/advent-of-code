import Level from "../../../utils/level";

function findFirstDigit(line: string, options = { reversed: false }) {
  let wordDigitMap: any = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  if (options.reversed) {
    line = line.split("").reverse().join("");
    wordDigitMap = Object.fromEntries(
      Object.entries(wordDigitMap).map(([key, value]) => [key.split("").reverse().join(""), value]),
    );
  }

  const regex = new RegExp(`${Object.keys(wordDigitMap).join("|")}|\\d`);
  const wordOrDigit = regex.exec(line)![0];
  return wordDigitMap[wordOrDigit] ?? wordOrDigit;
}

export default class extends Level {
  public run() {
    return this.input
      .readLines()
      .map((line) => findFirstDigit(line) + findFirstDigit(line, { reversed: true }))
      .map((number) => parseInt(number))
      .reduce((a, b) => a + b, 0);
  }
}
