import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const instructions = this.input.readLines().flatMap((line) => {
      if (line.startsWith("addx")) return [0, parseInt(line.split(" ")[1])];
      return 0;
    });

    const signals = [20, 60, 100, 140, 180, 220].map(
      (cycle) => instructions.slice(0, cycle - 1).reduce((a, b) => a + b, 1) * cycle,
    );

    return signals.reduce((a, b) => a + b, 0);
  }
}
