import Level from "../../../utils/level";
import permutations from "./permutations";

export default class extends Level {
  private buildMap(m: string[]): (digit: string) => number | undefined {
    return (digit: string) => {
      const segments = digit
        .split("")
        .map((d) => ["a", "b", "c", "d", "e", "f", "g"][m.indexOf(d)])
        .sort()
        .join("");
      if (segments === "abcefg") return 0;
      else if (segments === "cf") return 1;
      else if (segments === "acdeg") return 2;
      else if (segments === "acdfg") return 3;
      else if (segments === "bcdf") return 4;
      else if (segments === "abdfg") return 5;
      else if (segments === "abdefg") return 6;
      else if (segments === "acf") return 7;
      else if (segments === "abcdefg") return 8;
      else if (segments === "abcdfg") return 9;
      else return undefined;
    };
  }

  public run() {
    let sum = 0;

    for (const line of this.input.readLines()) {
      const [leftDigits, rightDigits] = line.split(" | ").map((segments) => segments.split(" "));

      const map = permutations(["a", "b", "c", "d", "e", "f", "g"])
        .map((permutation) => this.buildMap(permutation))
        .find((map) => leftDigits.every((digit) => map(digit) !== undefined))!;

      sum += parseInt(rightDigits.map((digit) => map(digit)).join(""));
    }

    return sum;
  }
}
