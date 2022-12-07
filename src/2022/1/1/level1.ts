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

    const maxCalories = Math.max(...elves.map((elf) => elf.calories));
    return maxCalories;
  }
}
