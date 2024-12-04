import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const errors: { expected: string[]; found: string }[] = [];

    for (const l of this.input.readLines()) {
      const line = l.split("");
      let stack = [];
      for (const token of line) {
        if (token === "(") stack.push(")");
        if (token === "[") stack.push("]");
        if (token === "{") stack.push("}");
        if (token === "<") stack.push(">");

        if ([")", "]", "}", ">"].includes(token)) {
          const expected = stack.pop()!;
          if (expected !== token) {
            stack = [];
            break;
          }
        }
      }
      if (stack.length) errors.push({ expected: stack.reverse(), found: "" });
    }

    const scores = errors
      .map((error) =>
        error.expected
          .map((expected) =>
            expected === ")" ? 1 : expected === "]" ? 2 : expected === "}" ? 3 : expected === ">" ? 4 : NaN,
          )
          .reduce((a, b) => a * 5 + b, 0),
      )
      .sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
  }
}
