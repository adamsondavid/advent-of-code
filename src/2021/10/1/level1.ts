import Level from "../../../utils/level";

export default class extends Level {
  public run() {
    const errors: { expected: string; found: string }[] = [];

    for (const l of this.input.readLines()) {
      const line = l.split("");
      const stack = [];
      for (const token of line) {
        if (token === "(") stack.push(")");
        if (token === "[") stack.push("]");
        if (token === "{") stack.push("}");
        if (token === "<") stack.push(">");

        if ([")", "]", "}", ">"].includes(token)) {
          const expected = stack.pop()!;
          if (expected !== token) {
            errors.push({ expected, found: token });
            break;
          }
        }
      }
    }

    return errors
      .map((error) => error.found)
      .map((found) => (found === ")" ? 3 : found === "]" ? 57 : found === "}" ? 1197 : found === ">" ? 25137 : NaN))
      .reduce((a, b) => a + b, 0);
  }
}
