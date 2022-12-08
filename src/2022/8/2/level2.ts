import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const forest = this.input.readLines();
    const scenicScores = [];

    for (let y = 0; y < forest.length; y++) {
      for (let x = 0; x < forest[y].length; x++) {
        const tree = parseInt(forest[y][x]);
        let viewingDistanceNorth = 0;
        let viewingDistanceEast = 0;
        let viewingDistanceSouth = 0;
        let viewingDistanceWest = 0;

        for (let ty = y - 1; ty >= 0; ty--) {
          viewingDistanceNorth++;
          if (parseInt(forest[ty][x]) >= tree) break;
        }
        for (let tx = x + 1; tx < forest[y].length; tx++) {
          viewingDistanceEast++;
          if (parseInt(forest[y][tx]) >= tree) break;
        }
        for (let ty = y + 1; ty < forest.length; ty++) {
          viewingDistanceSouth++;
          if (parseInt(forest[ty][x]) >= tree) break;
        }
        for (let tx = x - 1; tx >= 0; tx--) {
          viewingDistanceWest++;
          if (parseInt(forest[y][tx]) >= tree) break;
        }

        scenicScores.push(viewingDistanceNorth * viewingDistanceEast * viewingDistanceSouth * viewingDistanceWest);
      }
    }

    return Math.max(...scenicScores);
  }
}
