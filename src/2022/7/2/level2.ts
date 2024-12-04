import Level from "../../../utils/level";

interface Node {
  readonly name: string;
  readonly size: number;
}

class File implements Node {
  public readonly name;
  public readonly size;
  public constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

class Directory implements Node {
  public readonly name;
  private readonly parent;
  public readonly entries: Node[];

  public constructor(name: string, parent?: Directory) {
    this.name = name;
    this.parent = parent;
    this.entries = [];
  }

  public cd(name: string): Directory {
    const entry = name === ".." ? this.parent : this.entries.find((entry) => entry.name === name);
    if (entry && entry instanceof Directory) return entry;
    throw new Error("directory does not exist: " + name);
  }

  public link(entry: Node) {
    this.entries.push(entry);
  }

  public get size() {
    return this.entries.map((entry) => entry.size).reduce((a, b) => a + b, 0);
  }
}

function allDirectories(root: Directory, dirs: Directory[] = []) {
  dirs.push(root);
  for (const entry of root.entries) if (entry instanceof Directory) allDirectories(entry, dirs);
  return dirs;
}

export default class extends Level {
  public run() {
    const rootDir = new Directory("/");
    let currentDir = rootDir;

    this.input.readLine(); // get rid of first "cd /" command

    let line;
    while ((line = this.input.readLine())) {
      if (line.startsWith("$ ")) {
        if (line.split(" ")[1] === "cd") currentDir = currentDir.cd(line.split(" ")[2]);
      } else if (line.startsWith("dir ")) {
        currentDir.link(new Directory(line.split(" ")[1], currentDir));
      } else {
        currentDir.link(new File(line.split(" ")[1], parseInt(line.split(" ")[0])));
      }
    }

    const totalDiskSpace = 70000000;
    const requiredDiskSpace = 30000000;
    const usedDiskSpace = rootDir.size;
    const freeDiskSpace = totalDiskSpace - usedDiskSpace;
    const diskSpaceToFree = requiredDiskSpace - freeDiskSpace;

    return allDirectories(rootDir)
      .map((dir) => dir.size)
      .filter((size) => size >= diskSpaceToFree)
      .sort((a, b) => a - b)[0];
  }
}
