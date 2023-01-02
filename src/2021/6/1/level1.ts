import Level from "../../../utils/level";

type Lanternfish = { timer: number };

export default class extends Level {
  public run() {
    const lanternfishes: Lanternfish[] = this.input
      .readLine()!
      .split(",")
      .map((lanternfish) => ({ timer: parseInt(lanternfish) }));

    for (let day = 1; day <= 80; day++) {
      const newLanternfishes: Lanternfish[] = [];
      for (const lanternfish of lanternfishes) {
        if (lanternfish.timer === 0) {
          lanternfish.timer = 6;
          newLanternfishes.push({ timer: 8 });
        } else lanternfish.timer--;
      }
      lanternfishes.push(...newLanternfishes);
    }

    return lanternfishes.length;
  }
}
