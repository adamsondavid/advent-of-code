import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const depths = this.input.readLines().map((line) => parseInt(line));
    let depthIncreases = 0;
    let lastDepth = depths[0] + depths[1] + depths[2];
    for (let i = 0; i < depths.length - 2; i++) {
      const depth = depths[i] + depths[i + 1] + depths[i + 2];
      if (depth > lastDepth) depthIncreases++;
      lastDepth = depth;
    }
    return depthIncreases;
  }
}
