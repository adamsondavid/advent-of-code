export default class StringStream {
  private readonly lines: string[];

  public constructor(lines?: any) {
    if (lines) this.lines = this.split(lines);
    else this.lines = [];
  }

  public readLine() {
    return this.lines.shift();
  }

  public readLines() {
    return this.lines.splice(0);
  }

  public writeLine(lines: any) {
    this.lines.push(...this.split(lines));
  }

  private split(lines: any) {
    const splitted = `${lines}`.split("\n");
    if (splitted.at(-1) === "") splitted.pop();
    return splitted;
  }

  public toString() {
    return this.lines.join("\n") + "\n";
  }
}
