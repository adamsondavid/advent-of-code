import Level from "../../../utils/level";

interface Outcome {
  readonly value: number;
}

interface Shape {
  readonly value: number;
  compete(shape: Shape): Outcome;
}

const win: Outcome = { value: 6 };
const draw: Outcome = { value: 3 };
const loose: Outcome = { value: 0 };

const rock: Shape = {
  value: 1,
  compete(symbol: Shape) {
    if (symbol === this) return draw;
    if (symbol === scissors) return win;
    return loose;
  },
};

const scissors: Shape = {
  value: 3,
  compete(symbol: Shape) {
    if (symbol === this) return draw;
    if (symbol === paper) return win;
    return loose;
  },
};

const paper: Shape = {
  value: 2,
  compete(symbol: Shape) {
    if (symbol === this) return draw;
    if (symbol === rock) return win;
    return loose;
  },
};

class Round {
  private readonly playerAShape: Shape;
  private readonly playerBShape: Shape;

  public constructor(playerAShape: Shape, playerBShape: Shape) {
    this.playerAShape = playerAShape;
    this.playerBShape = playerBShape;
  }

  public calculateScoreForPlayerB() {
    const outcome = this.playerBShape.compete(this.playerAShape);
    return this.playerBShape.value + outcome.value;
  }
}

function createSymbol(input: string) {
  if (input === "A" || input === "X") return rock;
  if (input === "B" || input === "Y") return paper;
  if (input === "C" || input === "Z") return scissors;
  throw new Error("undefined input: " + input);
}

export default class extends Level {
  public run() {
    let score = 0;
    for (const line of this.input.readLines()) {
      const [a, b] = line.split(" ");
      const round = new Round(createSymbol(a), createSymbol(b));
      score += round.calculateScoreForPlayerB();
    }
    return score;
  }
}
