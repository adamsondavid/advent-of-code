import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    let horizontalPosition = 0;
    let depth = 0;

    for (const line of this.input.readLines()) {
      const [direction, amountS] = line.split(" ");
      const amount = parseInt(amountS);

      if (direction === "forward") horizontalPosition += amount;
      if (direction === "down") depth += amount;
      if (direction === "up") depth -= amount;
    }

    return horizontalPosition * depth;
  }
}
