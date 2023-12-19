import StringStream from "../../../utils/string-stream";

type Part = { x: number; m: number; a: number; s: number };

export function solve(input: StringStream) {
  const [rulesString, partsString] = input.readLines().join("\n").split("\n\n");

  const rules = Object.fromEntries(
    rulesString.split("\n").map((line) => {
      const name = line.match(/[a-z]{2,}/)![0];
      const nextRule = line
        .replace(/.*\{(.*)}/, "$1")
        .replaceAll(":", " ? ")
        .replaceAll(",", " : ")
        .replaceAll("<", " < ")
        .replaceAll(">", " > ")
        .replaceAll(/([a-z]{2,}|[AR])/g, "'$1'");
      console.log({ name, nextRule });
      return [name, new Function("part", `const { x, m, a, s } = part; return ${nextRule};`)];
    }),
  );

  const parts = partsString
    .split("\n")
    .map((line) => JSON.parse(line.replaceAll("=", ":").replaceAll(/([xmas])/g, '"$1"')) as Part);

  return parts
    .map((part) => {
      let status = "in";
      while (!["A", "R"].includes(status)) status = rules[status](part);
      return { part, status };
    })
    .filter(({ status }) => status === "A")
    .map(({ part }) => part.x + part.m + part.a + part.s)
    .reduce((sum, partValue) => sum + partValue);
}
