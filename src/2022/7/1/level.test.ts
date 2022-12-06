import { describe, expect, test } from "@jest/globals";
import StringStream from "../../../utils/string-stream";
import Level from "./level";
import { readFile as _readFile, writeFile as _writeFile } from "fs/promises";
import { existsSync } from "fs";
import { testLevel, testName } from "../../../utils/test-utils";
import AdventOfCodeApi from "../../../utils/advent-of-code-api";
import env from "../../../../env";
import { question } from "../../../utils/readline";

describe(testLevel(__dirname).join("::"), () => {
  const adventOfCodeApi = new AdventOfCodeApi(env.SESSION_ID);
  const inputFile = () => `${__dirname}/${testName()}`;
  const readFile = () => _readFile(inputFile(), "utf8");
  const writeFile = (data: string) => _writeFile(inputFile(), data);

  test("example.txt", async () => {
    const input = new StringStream(await readFile());
    const expectedOutput = input.readLine();
    const output = new Level(input).run();
    expect(output).toBe(expectedOutput);
  });

  test("../prod.txt", async () => {
    const [year, day, level] = testLevel(__dirname);
    if (!existsSync(inputFile())) await writeFile(await adventOfCodeApi.getInput(year, day));
    const input = new StringStream(await readFile());
    const output = new Level(input).run();
    if ((await question(`submit output (${output})?: `)) === "y")
      await adventOfCodeApi.submitOutput(year, day, level, output);
  });
});
