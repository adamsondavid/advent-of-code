import { expect } from "@jest/globals";
import { readFile, writeFile } from "fs/promises";

export async function readInputFile() {
  const [level, file] = expect.getState().currentTestName!.split(" ");
  return await readFile(`src/${level}/input/${level}_${file}.in`, "utf-8");
}

export async function writeOutputFile(data: string) {
  const [level, file] = expect.getState().currentTestName!.split(" ");
  await writeFile(`src/${level}/output/${level}_${file}.out`, data);
}

export async function readExpectedExampleOutputFile() {
  const level = expect.getState().currentTestName!.split(" ")[0];
  return await readFile(`src/${level}/input/${level}_example.out`, "utf-8");
}
