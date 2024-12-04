import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const lanternfishes: number[] = this.input
      .readLine()!
      .split(",")
      .map((lanternfish) => ({ timer: parseInt(lanternfish) }))
      .reduce((lanternfishes, lanternfish) => {
        lanternfishes[lanternfish.timer]++;
        return lanternfishes;
      }, new Array(9).fill(0));

    for (let day = 1; day <= 256; day++) {
      const newLanternfishes = lanternfishes.shift()!;
      lanternfishes[6] += newLanternfishes;
      lanternfishes.push(newLanternfishes);
    }

    return lanternfishes.reduce((a, b) => a + b, 0);
  }
}
