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
  private energyLevel;
  public readonly neighbours;

  public constructor(position: Vec2, energyLevel: number) {
    this.position = position;
    this.energyLevel = energyLevel;
    this.neighbours = new Array<Octopus>();
  }

  public increaseEnergyLevel(): number {
    this.energyLevel++;
    if (this.energyLevel === 10)
      return this.neighbours.map((neighbour) => neighbour.increaseEnergyLevel()).reduce((a, b) => a + b, 1);
    else return 0;
  }

  public resetEnergyLevel() {
    if (this.energyLevel >= 10) this.energyLevel = 0;
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

    let flashes = 0;
    for (let round = 0; round < 100; round++) {
      for (const octopus of octopuses) flashes += octopus.increaseEnergyLevel();
      for (const octopus of octopuses) octopus.resetEnergyLevel();
    }
    return flashes;
  }
}
