import Level from "../../../utils/level";

const fuelCostCache: number[] = [0];
function fuelCost(steps: number) {
  if (fuelCostCache[steps] === undefined) fuelCostCache[steps] = fuelCost(steps - 1) + steps;
  return fuelCostCache[steps];
}

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
      const cost = crabs.reduce((cost, crab) => cost + fuelCost(Math.abs(crab - position)), 0);
      if (cost < minCost) minCost = cost;
    }

    return minCost;
  }
}
