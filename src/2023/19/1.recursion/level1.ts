import StringStream from "../../../utils/string-stream";

export function solve(input: StringStream) {
  const [rulesString, partsString] = input.readLines().join("\n").split("\n\n");

  const isAcceptedSourceCode = `
    const { x, m, a, s } = part;
    const A = () => true;
    const R = () => false;
    ${rulesString
      .split("\n")
      .map((line) =>
        line
          .replaceAll(":", " ? ")
          .replaceAll(",", " : ")
          .replaceAll("<", " < ")
          .replaceAll(">", " > ")
          .replaceAll("in", "IN")
          .replaceAll(/([a-zA-Z]{2,}|[AR])/g, "$1()")
          .replace(/([a-zA-Z]+)\(\)\{(.*)}/, "const $1 = () => $2;"),
      )
      .join("\n")}
    return IN();
  `.replace(/^\s*/gm, "");
  const isAccepted = new Function("part", isAcceptedSourceCode);
  console.log(isAcceptedSourceCode);

  return partsString
    .split("\n")
    .map((line) => JSON.parse(line.replaceAll("=", ":").replaceAll(/([xmas])/g, '"$1"')))
    .filter((part) => isAccepted(part))
    .map((part) => part.x + part.m + part.a + part.s)
    .reduce((sum, partValue) => sum + partValue);
}
