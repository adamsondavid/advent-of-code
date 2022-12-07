import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const path: string[] = [];
    const directories = new Map<string, number>();

    for (const line of this.input.readLines()) {
      const splitted = line.split(" ");
      if (splitted[0] === "$") {
        if (splitted[1] === "cd") {
          if (splitted[2] === "..") {
            path.pop();
          } else {
            path.push(splitted[2]);
          }
        }
      } else if (splitted[0] !== "dir") {
        for (let i = 0; i < path.length; i++) {
          const directory = path.slice(0, i + 1).join("/");
          directories.set(directory, (directories.get(directory) ?? 0) + parseInt(splitted[0]));
        }
      }
    }

    return Array.from(directories.values())
      .filter((size) => size <= 100000)
      .reduce((a, b) => a + b, 0);
  }
}
