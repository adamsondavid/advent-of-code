import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const crates: string[][] = [];

    for (let line = this.input.readLine()!; !line.startsWith(" 1"); line = this.input.readLine()!) {
      let cratesIndex = 0;
      for (let i = 1; i < line.length; i += 4) {
        if (!crates[cratesIndex]) crates[cratesIndex] = [];
        if (line[i] !== " ") crates[cratesIndex].unshift(line[i]);
        cratesIndex++;
      }
    }

    this.input.readLine();

    for (const line of this.input.readLines()) {
      const split = line.split(" ");
      const count = parseInt(split[1]);
      const from = parseInt(split[3]);
      const to = parseInt(split[5]);

      const buffer = crates[from - 1].splice(crates[from - 1].length - count);
      crates[to - 1].push(...buffer);
    }

    return crates.map((stack) => stack.pop()).join("");
  }
}
