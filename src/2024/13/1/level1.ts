import StringStream from "../../../utils/string-stream";
import { rmSync, writeFileSync } from "fs";
import { promisify } from "node:util";
import child_process from "node:child_process";
import * as crypto from "node:crypto";

const exec = promisify(child_process.exec);

export async function solve(input: StringStream) {
  const machines = input
    .readLines()
    .join("\n")
    .split("\n\n")
    .map((machine) => {
      const [a, b, p] = machine.split("\n").map((line) => line.match(/\d+/g)!.map(Number));
      return { a: { dx: a[0], dy: a[1] }, b: { dx: b[0], dy: b[1] }, price: { x: p[0], y: p[1] } };
    });

  const files = machines.map((machine) => {
    const variables = ["a", "b"];
    const script = [
      "import json",
      "import z3",
      `${variables.join(", ")} = z3.Reals("${variables.join(" ")}")`,
      `equations = [
        ${machine.price.x} == a * ${machine.a.dx} + b * ${machine.b.dx},
        ${machine.price.y} == a * ${machine.a.dy} + b * ${machine.b.dy},
      ]`,
      `solver = z3.Solver()`,
      `solver.add(*equations)`,
      `solver.check()`,
      `model = solver.model()`,
      `print(model)`,
    ].join("\n");
    const file = `${__dirname}/${crypto.randomUUID()}.py`;
    writeFileSync(file, script);
    return file;
  });

  const results = await Promise.all(
    files.map(async (file) =>
      (await exec(`python3 "${file}"`)).stdout
        .replace("\r\n", "")
        .replace("[", "{")
        .replace("]", "}")
        .replace("a", '"a"')
        .replace("b", '"b"')
        .replaceAll(" =", ":"),
    ),
  );

  files.forEach((file) => rmSync(file));

  return results
    .filter((res) => !res.includes("/"))
    .filter((res) => !res.includes("-"))
    .map((res) => JSON.parse(res))
    .map((res) => res.b + res.a * 3)
    .reduce((sum, coins) => sum + coins, 0);
}
