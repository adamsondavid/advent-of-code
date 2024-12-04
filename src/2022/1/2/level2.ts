import Level from "../../../utils/level";

type Elf = {
  calories: number;
};

export default class extends Level {
  public run() {
    const elves: Elf[] = [];

    let currentElf: Elf = { calories: 0 };
    for (const line of this.input.readLines()) {
      if (line === "") {
        elves.push(currentElf);
        currentElf = { calories: 0 };
      } else currentElf.calories += parseInt(line);
    }
    elves.push(currentElf);

    elves.sort((a, b) => b.calories - a.calories);
    return elves[0].calories + elves[1].calories + elves[2].calories;
  }
}
