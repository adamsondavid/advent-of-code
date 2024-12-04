import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const word = this.input.readLine()!.split("");
    this.input.readLine();
    const rules = new Map<string, string>(
      this.input.readLines().map((line) => [line.split(" -> ")[0], line.split(" -> ")[1]]),
    );

    let map = word
      .slice(1)
      .map((char, i) => word[i] + char)
      .reduce((map, part) => map.set(part, (map.get(part) ?? 0) + 1), new Map<string, number>());

    for (let round = 1; round <= 40; round++) {
      const newMap = new Map<string, number>();
      for (const [part, occurrence] of map.entries()) {
        const [left, right] = part.split("");
        const middle = rules.get(part);
        newMap.set(left + middle, (newMap.get(left + middle) ?? 0) + occurrence);
        newMap.set(middle + right, (newMap.get(middle + right) ?? 0) + occurrence);
      }
      map = newMap;
    }

    const occurrences = [
      ...[...map.entries()]
        .reduce(
          (occurrences, [part, occurrence]) =>
            occurrences.set(part.split("")[1], (occurrences.get(part.split("")[1]) ?? 0) + occurrence),
          new Map<string, number>(),
        )
        .values(),
    ].sort((a, b) => b - a);
    return occurrences[0] - occurrences[occurrences.length - 1];
  }
}
