import Level from "../utils/level";

export default class extends Level {
  public run(): void {
    const input = this.input.readLine()!;

    const buffer = [];
    for (let i = 0; i < input.length; i++) {
      if (buffer.length === 14) buffer.shift();
      buffer.push(input[i]);
      if (buffer.length === 14) {
        if ([...new Set(buffer)].length === 14) {
          this.output.writeLine(i + 1);
          return;
        }
      }
    }
  }
}
