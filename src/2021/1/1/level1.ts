import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const depths = this.input.readLines().map((line) => parseInt(line));
    let depthIncreases = 0;
    let lastDepth = depths[0];
    for (const depth of depths) {
      if (depth > lastDepth) depthIncreases++;
      lastDepth = depth;
    }
    return depthIncreases;
  }
}
