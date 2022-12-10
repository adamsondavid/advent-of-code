import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const instructions = this.input.readLines().flatMap((line) => {
      if (line.startsWith("addx")) return ["noop", line];
      return line;
    });

    let cycle = 1;
    let x = 1;
    const crt: string[] = [];
    let crtLine = "";

    for (const instruction of instructions) {
      if ([x - 1, x, x + 1].includes(crtLine.length)) crtLine += "#";
      else crtLine += ".";

      if (cycle % 40 === 0) {
        crt.push(crtLine);
        crtLine = "";
      }

      const [op, summand] = instruction.split(" ");
      if (op === "addx") x += parseInt(summand);

      cycle++;
    }

    return crt;
  }
}
