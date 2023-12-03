import Level from "../../../utils/level";

type Resource = "ORE" | "CLAY" | "OBSIDIAN" | "GEODE";

type Cost = {
  readonly resource: Resource;
  readonly amount: number;
};

type Robot = {
  readonly type: Resource;
  readonly cost: Cost[];
};

type Blueprint = {
  readonly id: number;
  readonly robots: Robot[];
  readonly maxOre: number;
  readonly maxClay: number;
  readonly maxObsidian: number;
};

function simulate(
  round: number,
  blueprint: Blueprint,
  robots: Map<Resource, number>,
  resources: Map<Resource, number>,
  notAllowedToBuy: Resource[] = [],
  result = { maxGeodes: 0 },
) {
  const newResources = new Map<Resource, number>(resources);
  Array.from(robots.entries()).forEach(([resource, amount]) =>
    newResources.set(resource, (newResources.get(resource) ?? 0) + amount),
  );

  const geodes = newResources.get("GEODE") ?? 0;
  if (geodes > result.maxGeodes) result.maxGeodes = geodes;

  if (round === 24) return;

  const newNotAllowedToBuy = [...notAllowedToBuy];
  for (const robot of blueprint.robots) {
    if (robot.type === "ORE" && (robots.get("ORE") ?? 0) >= blueprint.maxOre) continue;
    if (robot.type === "CLAY" && (robots.get("CLAY") ?? 0) >= blueprint.maxClay) continue;
    if (robot.type === "OBSIDIAN" && (robots.get("OBSIDIAN") ?? 0) >= blueprint.maxObsidian) continue;
    if (notAllowedToBuy.includes(robot.type)) continue;
    const enoughResources = robot.cost
      .map((cost) => (resources.get(cost.resource) ?? 0) >= cost.amount)
      .every((enoughResources) => enoughResources);
    if (enoughResources) {
      newNotAllowedToBuy.push(robot.type);
      const newNewResources = new Map<Resource, number>(newResources);
      for (const cost of robot.cost) {
        newNewResources.set(cost.resource, (newNewResources.get(cost.resource) ?? 0) - cost.amount);
      }
      const newRobots = new Map<Resource, number>(robots);
      newRobots.set(robot.type, (newRobots.get(robot.type) ?? 0) + 1);
      simulate(round + 1, blueprint, newRobots, newNewResources, [], result);
    }
  }

  simulate(round + 1, blueprint, robots, newResources, newNotAllowedToBuy, result);

  return result.maxGeodes;
}

export default class extends Level {
  public run() {
    const blueprints: Blueprint[] = [];

    for (const line of this.input.readLines()) {
      const splitted = line.split(" ");
      blueprints.push({
        id: parseInt(splitted[1]),
        robots: [
          { type: "ORE", cost: [{ resource: "ORE", amount: parseInt(splitted[6]) }] },
          { type: "CLAY", cost: [{ resource: "ORE", amount: parseInt(splitted[12]) }] },
          {
            type: "OBSIDIAN",
            cost: [
              { resource: "ORE", amount: parseInt(splitted[18]) },
              { resource: "CLAY", amount: parseInt(splitted[21]) },
            ],
          },
          {
            type: "GEODE",
            cost: [
              { resource: "ORE", amount: parseInt(splitted[27]) },
              { resource: "OBSIDIAN", amount: parseInt(splitted[30]) },
            ],
          },
        ],
        maxOre: Math.max(parseInt(splitted[6]), parseInt(splitted[12]), parseInt(splitted[18]), parseInt(splitted[27])),
        maxClay: parseInt(splitted[21]),
        maxObsidian: parseInt(splitted[30]),
      });
    }

    let qualityLevelSum = 0;
    for (const blueprint of blueprints) {
      const robots = new Map<Resource, number>();
      robots.set("ORE", 1);
      const geodes = simulate(1, blueprint, robots, new Map<Resource, number>())!;
      qualityLevelSum += blueprint.id * geodes;
    }

    return qualityLevelSum;
  }
}
