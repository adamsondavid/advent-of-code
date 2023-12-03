import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const word = this.input.readLine()!.split("");
    this.input.readLine();
    const rules = new Map<string, string>(
      this.input.readLines().map((line) => [line.split(" -> ")[0], line.split(" -> ")[1]]),
    );

    for (let step = 1; step <= 10; step++)
      for (let pos = 1; pos < word.length; pos += 2) word.splice(pos, 0, rules.get(word[pos - 1] + word[pos])!);

    const occurrences = [
      ...word.reduce((map, char) => map.set(char, (map.get(char) ?? 0) + 1), new Map<string, number>()).values(),
    ].sort((a, b) => b - a);
    return occurrences[0] - occurrences[occurrences.length - 1];
  }
}
