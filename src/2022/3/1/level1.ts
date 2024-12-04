import Level from "../../../utils/level";

class Item {
  public readonly identifier: string;

  public constructor(identifier: string) {
    this.identifier = identifier;
  }

  public get value() {
    const code = this.identifier.charCodeAt(0);
    if (code >= 97) return code - 96;
    return code - 38;
  }
}

class Rucksack {
  private readonly compartmentA;
  private readonly compartmentB;

  public constructor(compartmentA: Item[], compartmentB: Item[]) {
    this.compartmentA = compartmentA;
    this.compartmentB = compartmentB;
  }

  public get priorityItem() {
    return this.compartmentA.find((itemA) => this.compartmentB.find((itemB) => itemA.identifier === itemB.identifier))!;
  }
}

function createItems(linePart: string) {
  return linePart.split("").map((char) => new Item(char));
}

function createRucksack(line: string) {
  const compartmentA = createItems(line.substring(0, line.length / 2));
  const compartmentB = createItems(line.substring(line.length / 2));
  return new Rucksack(compartmentA, compartmentB);
}

export default class extends Level {
  public run() {
    const value = this.input
      .readLines()
      .map((line) => createRucksack(line).priorityItem.value)
      .reduce((priorityItemValueA, priorityItemValueB) => priorityItemValueA + priorityItemValueB, 0);
    return value;
  }
}
