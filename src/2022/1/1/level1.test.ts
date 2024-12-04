import { beforeEach, describe, expect, test } from "vitest";
import StringStream from "../../../utils/string-stream";
import Level from "./level1";
import { readFile } from "fs/promises";
import { testName } from "../../../utils/test-utils";

describe("level1", () => {
  let level: Level;

  beforeEach(async () => {
    const input = new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));
    level = new Level(input);
  });

  test("../example.txt", async () => {
    const output = level.run();
    expect(output).toBe(24000);
  });

  test("../prod.txt", async () => {
    const output = level.run();
    expect(output).toBe(71471);
  });
});
