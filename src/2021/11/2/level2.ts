import Level from "../../../utils/level";

type Vec2 = { readonly x: number; readonly y: number };
const directions = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
];

class Octopus {
  public position: Vec2;
  private _energyLevel;
  public readonly neighbours;

  public constructor(position: Vec2, energyLevel: number) {
    this.position = position;
    this._energyLevel = energyLevel;
    this.neighbours = new Array<Octopus>();
  }

  public get energyLevel() {
    return this._energyLevel;
  }

  public increaseEnergyLevel(): number {
    this._energyLevel++;
    if (this._energyLevel === 10)
      return this.neighbours.map((neighbour) => neighbour.increaseEnergyLevel()).reduce((a, b) => a + b, 1);
    else return 0;
  }

  public resetEnergyLevel() {
    if (this._energyLevel >= 10) this._energyLevel = 0;
  }
}

export default class extends Level {
  public run() {
    const map = this.input
      .readLines()
      .map((line, y) => line.split("").map((energyLevel, x) => new Octopus({ x, y }, parseInt(energyLevel))));

    const octopuses = map.flatMap((octopus) => octopus);
    for (const octopus of octopuses) {
      const neighbours = directions
        .map((direction) => ({
          x: octopus.position.x + direction.x,
          y: octopus.position.y + direction.y,
        }))
        .map((neighbourPosition) => map[neighbourPosition.y]?.[neighbourPosition.x])
        .filter((neighbour) => neighbour);
      octopus.neighbours.push(...neighbours);
    }

    let round = 0;
    while (!octopuses.every((octopus) => octopus.energyLevel === 0)) {
      for (const octopus of octopuses) octopus.increaseEnergyLevel();
      for (const octopus of octopuses) octopus.resetEnergyLevel();
      round++;
    }
    return round;
  }
}
