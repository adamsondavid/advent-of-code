import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const forest = this.input.readLines();
    let visibleTrees = 0;

    for (let y = 0; y < forest.length; y++) {
      for (let x = 0; x < forest[y].length; x++) {
        if (x === 0 || y === 0 || x === forest[y].length - 1 || y === forest.length - 1) {
          visibleTrees++;
          continue;
        }

        const tree = parseInt(forest[y][x]);
        const treesNorth = [];
        const treesEast = [];
        const treesSouth = [];
        const treesWest = [];

        for (let ty = y - 1; ty >= 0; ty--) {
          treesNorth.push(parseInt(forest[ty][x]));
        }
        for (let tx = x + 1; tx < forest[y].length; tx++) {
          treesEast.push(parseInt(forest[y][tx]));
        }
        for (let ty = y + 1; ty < forest.length; ty++) {
          treesSouth.push(parseInt(forest[ty][x]));
        }
        for (let tx = x - 1; tx >= 0; tx--) {
          treesWest.push(parseInt(forest[y][tx]));
        }

        if (treesNorth.every((t) => t < tree)) visibleTrees++;
        else if (treesEast.every((t) => t < tree)) visibleTrees++;
        else if (treesSouth.every((t) => t < tree)) visibleTrees++;
        else if (treesWest.every((t) => t < tree)) visibleTrees++;
      }
    }

    return visibleTrees;
  }
}
