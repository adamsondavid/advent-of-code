import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { readExpectedExampleOutputFile, readInputFile, writeOutputFile } from "../utils/integration-test-utils";
import StringStream from "../utils/string-stream";
import Level1 from "./level";

describe("level2.1", () => {
  let output: StringStream;
  let level: Level1;

  beforeEach(async () => {
    const input = new StringStream(await readInputFile());
    output = new StringStream();
    level = new Level1(input, output);
  });

  afterEach(async () => {
    await writeOutputFile(output.toString());
  });

  test("example", async () => {
    level.run();
    const expectedOutput = await readExpectedExampleOutputFile();
    expect(output.toString()).toBe(expectedOutput);
  });

  test("puzzle", async () => {
    level.run();
  });
});
