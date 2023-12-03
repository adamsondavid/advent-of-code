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

class RucksackGroup {
  private readonly rucksackA;
  private readonly rucksackB;
  private readonly rucksackC;

  public constructor(rucksackA: Item[], rucksackB: Item[], rucksackC: Item[]) {
    this.rucksackA = rucksackA;
    this.rucksackB = rucksackB;
    this.rucksackC = rucksackC;
  }

  public get priorityItem() {
    for (const itemA of this.rucksackA) {
      for (const itemB of this.rucksackB) {
        for (const itemC of this.rucksackC) {
          if (itemA.identifier === itemB.identifier && itemB.identifier === itemC.identifier) return itemA;
        }
      }
    }
    throw new Error("no priority item found");
  }
}

function createItems(linePart: string) {
  return linePart.split("").map((char) => new Item(char));
}

export default class extends Level {
  public run() {
    let value = 0;
    const lines = this.input.readLines();
    for (let i = 0; i < lines.length; i += 3) {
      const rucksackGroup = new RucksackGroup(
        createItems(lines[i]),
        createItems(lines[i + 1]),
        createItems(lines[i + 2]),
      );
      value += rucksackGroup.priorityItem.value;
    }
    return value;
  }
}
