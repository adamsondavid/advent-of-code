import Level from "../utils/level";

export default class extends Level {
  public run(): void {
    const crates: string[][] = [];
    let line;
    while ((line = this.input.readLine())) {
      if (line.startsWith(" 1")) break;
      const lineArr = line
        .replaceAll("    ", " ")
        .replaceAll("     ", " ")
        .replaceAll("        ", " ")
        .replaceAll("         ", " ")
        .split(" ");
      for (let i = 0; i < lineArr.length; i++) {
        if (lineArr[i] === "") continue;
        if (!crates[i]) crates[i] = [];
        crates[i].unshift(lineArr[i].replace(/\[|]/g, ""));
      }
    }
    this.input.readLine();

    for (const line of this.input.readLines()) {
      const split = line.split(" ");
      const count = parseInt(split[1]);
      const from = parseInt(split[3]);
      const to = parseInt(split[5]);

      for (let i = 0; i < count; i++) {
        const crate = crates[from - 1].pop()!;
        crates[to - 1].push(crate);
      }
    }

    const result = crates.map((stack) => stack.pop()).join("");
    this.output.writeLine(result);
  }
}
