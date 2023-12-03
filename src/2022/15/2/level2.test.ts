import { describe, expect, test } from "vitest";
import StringStream from "../../../utils/string-stream";
import Level from "./level2";
import { readFile } from "fs/promises";
import { testName } from "../../../utils/test-utils";

describe("level2", () => {
  test("../example.txt", async () => {
    const input = new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));
    const level = new Level(input, 20);

    const output = level.run();
    expect(output).toBe(56000011);
  });

  test("../prod.txt", async () => {
    const input = new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));
    const level = new Level(input, 4000000);

    const output = level.run();
    expect(output).toBe(13360899249595);
  });
});
