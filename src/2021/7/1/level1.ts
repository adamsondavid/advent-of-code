import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const crabs: number[] = this.input
      .readLine()!
      .split(",")
      .map((position) => parseInt(position));

    const minPosition = Math.min(...crabs);
    const maxPosition = Math.max(...crabs);

    let minCost = Infinity;

    for (let position = minPosition; position <= maxPosition; position++) {
      let cost = 0;
      for (const crab of crabs) cost += Math.abs(crab - position);
      if (cost < minCost) minCost = cost;
    }

    return minCost;
  }
}
