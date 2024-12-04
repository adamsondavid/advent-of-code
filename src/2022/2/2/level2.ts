import Level from "../../../utils/level";

interface Outcome {
  readonly name: string;
  readonly value: number;
}

interface Shape {
  name: string;
  readonly value: number;
  compete(shape: Shape): Outcome;
  findShapeTo(outcome: Outcome): Shape;
}

const win: Outcome = { name: "win", value: 6 };
const draw: Outcome = { name: "draw", value: 3 };
const loose: Outcome = { name: "loose", value: 0 };

const rock: Shape = {
  name: "rock",
  value: 1,
  compete(symbol: Shape) {
    if (symbol === this) return draw;
    if (symbol === scissors) return win;
    return loose;
  },
  findShapeTo(outcome: Outcome): Shape {
    if (outcome === draw) return this;
    if (outcome === win) return paper;
    if (outcome === loose) return scissors;
    throw Error("undefined outcome");
  },
};

const scissors: Shape = {
  name: "scissors",
  value: 3,
  compete(symbol: Shape) {
    if (symbol === this) return draw;
    if (symbol === paper) return win;
    return loose;
  },
  findShapeTo(outcome: Outcome): Shape {
    if (outcome === draw) return this;
    if (outcome === win) return rock;
    if (outcome === loose) return paper;
    throw Error("undefined outcome");
  },
};

const paper: Shape = {
  name: "paper",
  value: 2,
  compete(symbol: Shape) {
    if (symbol === this) return draw;
    if (symbol === rock) return win;
    return loose;
  },
  findShapeTo(outcome: Outcome): Shape {
    if (outcome === draw) return this;
    if (outcome === win) return scissors;
    if (outcome === loose) return rock;
    throw Error("undefined outcome");
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
  if (input === "A") return rock;
  if (input === "B") return paper;
  if (input === "C") return scissors;
  throw new Error("undefined input: " + input);
}

function createOutcome(input: string) {
  if (input === "X") return loose;
  if (input === "Y") return draw;
  if (input === "Z") return win;
  throw new Error("undefined input: " + input);
}

export default class extends Level {
  public run() {
    let score = 0;
    for (const line of this.input.readLines()) {
      const [a, b] = line.split(" ");
      const aShape = createSymbol(a);
      const bShape = aShape.findShapeTo(createOutcome(b));
      const round = new Round(aShape, bShape);
      score += round.calculateScoreForPlayerB();
    }
    return score;
  }
}
