import { describe, expect, test } from "vitest";
import StringStream from "../../../utils/string-stream";
import { solve } from "./level1";
import { readFile } from "fs/promises";
import { testName } from "../../../utils/test-utils";

describe("level1", () => {
  const readInput = async () => new StringStream(await readFile(`${__dirname}/${testName()}`, "utf8"));

  test("../example.txt", async () => {
    const input = await readInput();
    const output = solve(input, { start: 7, end: 27 });
    expect(output).toBe(2);
  });

  test("../prod.txt", async () => {
    const input = await readInput();
    const output = solve(input, { start: 200000000000000, end: 400000000000000 });
    expect(output).toBe(16665);
  });
});
