import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const games = this.input.readLines().map((line, i) => {
      const rounds = line.split(/: |; /).map((round) => round.split(", "));
      rounds.shift();
      return {
        id: i + 1,
        rounds: rounds.map((round) =>
          round.reduce(
            (rgb, nOfColor) => {
              const [n, color] = nOfColor.split(" ");
              rgb[color as "red" | "green" | "blue"] += parseInt(n);
              return rgb;
            },
            { red: 0, green: 0, blue: 0 },
          ),
        ),
      };
    });

    const possibleGameIds = games
      .filter((game) => game.rounds.every((round) => round.red <= 12 && round.green <= 13 && round.blue <= 14))
      .map((game) => game.id);

    return possibleGameIds.reduce((a, b) => a + b, 0);
  }
}
