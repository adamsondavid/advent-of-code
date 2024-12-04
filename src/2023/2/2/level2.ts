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

    const gamesWithPower = games.map((game) => {
      const maxRed = Math.max(...game.rounds.map((round) => round.red));
      const maxGreen = Math.max(...game.rounds.map((round) => round.green));
      const maxBlue = Math.max(...game.rounds.map((round) => round.blue));
      return { game, power: maxRed * maxGreen * maxBlue };
    });

    return gamesWithPower.reduce((a, b) => a + b.power, 0);
  }
}
