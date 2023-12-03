import { describe, expect, test } from "vitest";
import StringStream from "../../../utils/string-stream";
import Level from "./level1";
import { readFile } from "fs/promises";
import { testName } from "../../../utils/test-utils";

describe("level1", () => {
  test("../example.txt", async () => {
    const input = new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));
    const level = new Level(input, 10);

    const output = level.run();
    expect(output).toBe(26);
  });

  test("../prod.txt", async () => {
    const input = new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));
    const level = new Level(input, 2000000);

    const output = level.run();
    expect(output).toBe(5832528);
  });
});
